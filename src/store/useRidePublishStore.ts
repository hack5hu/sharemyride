import { create } from 'zustand';
import { RideType } from '@/constants/enums';
import {
  type FinalRouteDetails,
  type RidePublishState,
  type RouteLeg,
  type VehicleDetails,
  type RidePreferences,
} from './types/publish';

export type {
  FinalRouteDetails,
  RidePublishState,
  RouteLeg,
  VehicleDetails,
  RidePreferences,
};

const INITIAL_PUBLISH_STATE = {
  rideType: RideType.INTERCITY,
  startLocation: null,
  destinationLocation: null,
  middleStops: [],
  routeDetails: null,
  selectedRoute: null,
  departureDate: null,
  departureDates: [] as string[],
  departureTime: null,
  seatCount: 3,
  selectedSeatIds: [2, 3, 5],
  vehicleId: null,
  publishVehicleType: '5' as const,
  vehicleDetails: null,
  preferences: {
    nonSmoking: true,
    womenOnly: false,
    music: 'Pop',
    luggage: false,
    pets: false,
  },
  price: 0,
  fullJourneyPrice: 0,
  frontSeatPrice: 0,
  premiumEnabled: false,
  premiumPercentage: 10,
  segmentPrices: {},
  requestType: 'instant' as const,
  editingDraftId: null,
};

export const useRidePublishStore = create<RidePublishState>(set => ({
  ...INITIAL_PUBLISH_STATE,

  setRideType: rideType =>
    set(state =>
      state.rideType === rideType
        ? state
        : {
            rideType,
            middleStops: rideType === RideType.LOCAL ? [] : state.middleStops,
            routeDetails: null,
            selectedRoute: null,
            price: 0,
            fullJourneyPrice: 0,
            frontSeatPrice: 0,
            premiumEnabled: false,
            premiumPercentage: 10,
            segmentPrices: {},
          },
    ),
  setStartLocation: location =>
    set({
      startLocation: location,
      routeDetails: null,
      selectedRoute: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
    }),
  setDestinationLocation: location =>
    set({
      destinationLocation: location,
      routeDetails: null,
      selectedRoute: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
    }),
  addMiddleStop: location =>
    set(state => ({
      middleStops: [...state.middleStops, location],
      routeDetails: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
    })),
  removeMiddleStop: id =>
    set(state => ({
      middleStops: state.middleStops.filter(stop => stop.id !== id),
      routeDetails: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
    })),
  setMiddleStops: locations =>
    set({
      middleStops: locations,
      routeDetails: null,
      price: 0,
      fullJourneyPrice: 0,
      frontSeatPrice: 0,
      segmentPrices: {},
    }),
  setRouteDetails: details =>
    set(state =>
      state.routeDetails === details
        ? state
        : {
            routeDetails: details,
            price: 0,
            fullJourneyPrice: 0,
            frontSeatPrice: 0,
            segmentPrices: {},
          },
    ),
  setSelectedRoute: route => set({ selectedRoute: route }),
  setDepartureDate: date =>
    set(state => ({
      departureDate: date,
      departureDates:
        state.departureDates.length > 0 &&
        date &&
        state.departureDates.includes(date)
          ? state.departureDates
          : date
          ? [date]
          : [],
    })),
  setDepartureDates: dates =>
    set({
      departureDates: dates,
      departureDate: dates[0] ?? null,
    }),
  setDepartureTime: time => set({ departureTime: time }),
  setSeatCount: count => set({ seatCount: count }),
  setSelectedSeatIds: ids => set({ selectedSeatIds: ids }),
  setVehicleId: id => set({ vehicleId: id }),
  setPublishVehicleType: type =>
    set(state =>
      state.publishVehicleType === type
        ? state
        : {
            publishVehicleType: type,
            price: 0,
            fullJourneyPrice: 0,
            frontSeatPrice: 0,
            segmentPrices: {},
          },
    ),
  setVehicleDetails: details => set({ vehicleDetails: details }),
  setPreferences: preferences => set({ preferences }),
  setPricing: pricing => set({ ...pricing }),
  setRequestType: requestType => set({ requestType }),
  setEditingDraftId: editingDraftId => set({ editingDraftId }),

  clearPublishState: () => set(INITIAL_PUBLISH_STATE),
}));
