import { useEffect, useRef, useCallback } from 'react';
import { Animated, Easing } from 'react-native';

const FADE_DURATION = 800;
const LOGO_SCALE_DURATION = 900;
const SUBTITLE_DELAY = 400;
const LOADER_DELAY = 700;
const PULSE_DURATION = 1400;
const ORB_SLOW = 3000;
const ORB_SLOWER = 3500;

interface SplashAnimations {
  logoOpacity: Animated.Value;
  logoScale: Animated.Value;
  subtitleOpacity: Animated.Value;
  loaderOpacity: Animated.Value;
  pulseScale: Animated.Value;
  pulseOpacity: Animated.Value;
  orbOneScale: Animated.Value;
  orbTwoScale: Animated.Value;
}

const createBreathingLoop = (
  animValue: Animated.Value,
  peak: number,
  valley: number,
  duration: number,
) =>
  Animated.loop(
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: peak,
        duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: valley,
        duration,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    ]),
  );

export const useSplashAnimations = (): SplashAnimations => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const loaderOpacity = useRef(new Animated.Value(0)).current;
  const pulseScale = useRef(new Animated.Value(0.6)).current;
  const pulseOpacity = useRef(new Animated.Value(1)).current;
  const orbOneScale = useRef(new Animated.Value(0.8)).current;
  const orbTwoScale = useRef(new Animated.Value(0.7)).current;

  const startPulseLoop = useCallback(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulseScale, {
            toValue: 1.2,
            duration: PULSE_DURATION,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseScale, {
            toValue: 0.6,
            duration: PULSE_DURATION,
            easing: Easing.in(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(pulseOpacity, {
            toValue: 0.3,
            duration: PULSE_DURATION,
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacity, {
            toValue: 1,
            duration: PULSE_DURATION,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();
  }, [pulseScale, pulseOpacity]);

  useEffect(() => {
    createBreathingLoop(orbOneScale, 1.15, 0.8, ORB_SLOW).start();
    createBreathingLoop(orbTwoScale, 1.1, 0.7, ORB_SLOWER).start();

    Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(logoScale, {
        toValue: 1,
        duration: LOGO_SCALE_DURATION,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(subtitleOpacity, {
      toValue: 1,
      duration: FADE_DURATION,
      delay: SUBTITLE_DELAY,
      useNativeDriver: true,
    }).start();

    Animated.timing(loaderOpacity, {
      toValue: 1,
      duration: FADE_DURATION,
      delay: LOADER_DELAY,
      useNativeDriver: true,
    }).start(() => startPulseLoop());
  }, [
    logoOpacity,
    logoScale,
    subtitleOpacity,
    loaderOpacity,
    orbOneScale,
    orbTwoScale,
    startPulseLoop,
  ]);

  return {
    logoOpacity,
    logoScale,
    subtitleOpacity,
    loaderOpacity,
    pulseScale,
    pulseOpacity,
    orbOneScale,
    orbTwoScale,
  };
};
