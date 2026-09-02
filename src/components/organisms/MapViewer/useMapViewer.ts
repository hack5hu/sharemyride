import { Client, type IMessage } from '@stomp/stompjs';
import { useState, useEffect, useRef } from 'react';
import * as Keychain from 'react-native-keychain';
import { BASE_URL } from '@/constants/apiEndpoints';
import { Logger } from '@/utils/logger';
import {
  type RideDetails,
  type Coordinate,
  type DriverLocationPayload,
  RideStatus,
} from './types.d';
import type MapView from 'react-native-maps';

// STOMP WebSocket requires TextEncoder/TextDecoder inside React Native environments
import 'fast-text-encoding';
if (typeof TextEncoder === 'undefined') {
  global.TextEncoder = require('fast-text-encoding').TextEncoder;
}
if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('fast-text-encoding').TextDecoder;
}

export const useMapViewer = (
  rideDetails: RideDetails,
  webSocketUrl?: string,
) => {
  const mapRef = useRef<MapView>(null);
  const [driverLocation, setDriverLocation] = useState<Coordinate | null>(
    rideDetails.driverLocation || null,
  );
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const stompClientRef = useRef<Client | null>(null);

  // Smoothly animate map camera to coordinates
  const animateToCoordinate = (coords: Coordinate) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.015,
        },
        1000, // 1 second animation duration
      );
    }
  };

  useEffect(() => {
    // Only ACTIVE trips in Phase 2 receive real-time updates via WebSocket stream
    if (rideDetails.status !== RideStatus.ACTIVE) {
      return;
    }

    const brokerUrl =
      webSocketUrl || BASE_URL.replace('http', 'ws') + '/ws/websocket';
    let client: Client;

    const connectWebSocket = async () => {
      try {
        const authCreds = await Keychain.getGenericPassword({
          service: 'auth_token',
        });
        const headers: Record<string, string> = {};
        if (authCreds) {
          headers.Authorization = `Bearer ${authCreds.password}`;
        }

        let mapRetryCount = 0;

        client = new Client({
          webSocketFactory: () => new WebSocket(brokerUrl),
          connectHeaders: headers,
          reconnectDelay: 15000,
          heartbeatIncoming: 10000,
          heartbeatOutgoing: 10000,
          forceBinaryWSFrames: true,
          appendMissingNULLonIncoming: true,
          debug: () => {},
        });

        client.onConnect = () => {
          mapRetryCount = 0;
          Logger.log(
            `[MapWS] Connected to channel: /topic/ride/${rideDetails.id}/location`,
          );
          setIsConnected(true);

          client.subscribe(
            `/topic/ride/${rideDetails.id}/location`,
            (msg: IMessage) => {
              try {
                const payload = JSON.parse(msg.body) as DriverLocationPayload;
                if (payload && payload.latitude && payload.longitude) {
                  const newCoords = {
                    latitude: payload.latitude,
                    longitude: payload.longitude,
                  };
                  setDriverLocation(newCoords);
                  animateToCoordinate(newCoords);
                }
              } catch (err) {
                Logger.error('[MapWS] Error parsing coordinate payload:', err);
              }
            },
          );
        };

        client.onDisconnect = () => {
          setIsConnected(false);
          Logger.log('[MapWS] Disconnected');
        };

        const handleMapWSFailure = () => {
          mapRetryCount++;
          setIsConnected(false);
          if (mapRetryCount >= 3) {
            Logger.log(
              '[MapWS] Maximum connection retries reached. Deactivating client.',
            );
            try {
              client.deactivate();
            } catch {}
          }
        };

        client.onStompError = () => {
          handleMapWSFailure();
        };

        client.onWebSocketError = () => {
          handleMapWSFailure();
        };

        stompClientRef.current = client;
        client.activate();
      } catch (err) {
        Logger.error('[MapWS] Socket connection routine faulted:', err);
      }
    };

    connectWebSocket();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
        stompClientRef.current = null;
      }
    };
  }, [rideDetails.id, rideDetails.status, webSocketUrl]);

  // Handle initial driver position animation if available
  useEffect(() => {
    if (driverLocation) {
      animateToCoordinate(driverLocation);
    }
  }, [driverLocation]);

  return {
    mapRef,
    driverLocation,
    isConnected,
  };
};
