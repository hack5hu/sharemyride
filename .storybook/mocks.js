import React from 'react';

const MockComponent = ({ children }) => children || null;

// MapLibre / Maps Mocks
export const MapView = MockComponent;
export const Camera = MockComponent;
export const UserLocation = MockComponent;
export const GeoJSONSource = MockComponent;
export const Layer = MockComponent;
export const Images = MockComponent;
export const SymbolLayer = MockComponent;
export const LineLayer = MockComponent;
export const FillLayer = MockComponent;
export const CircleLayer = MockComponent;
export const Map = MockComponent;
class TransformRequestManagerClass {
  add = () => {};
  remove = () => {};
  handle = (args) => args;
  addUrlSearchParam = () => {};
  addUrlTransform = () => {};
  removeUrlSearchParam = () => {};
  removeUrlTransform = () => {};
}
export const TransformRequestManager = new TransformRequestManagerClass();

// Date Picker Mocks
export const DatePicker = MockComponent;

// Safe Area Context Mocks
export const SafeAreaProvider = MockComponent;
export const SafeAreaView = MockComponent;
export const useSafeAreaInsets = () => ({ top: 0, right: 0, bottom: 0, left: 0 });
export const useSafeAreaFrame = () => ({ x: 0, y: 0, width: 390, height: 844 });

// MMKV Mock
export const MMKV = class {
  constructor(options) {
    this.options = options;
  }
  set = () => {};
  getString = () => null;
  getNumber = () => null;
  getBoolean = () => null;
  delete = () => {};
  clearAll = () => {};
};
export const createMMKV = (options) => new MMKV(options);

// Permissions Mocks
export const PermissionsAndroid = {
  request: () => Promise.resolve('granted'),
  check: () => Promise.resolve(true),
  RESULTS: { GRANTED: 'granted' },
  PERMISSIONS: {
    READ_EXTERNAL_STORAGE: 'android.permission.READ_EXTERNAL_STORAGE',
    WRITE_EXTERNAL_STORAGE: 'android.permission.WRITE_EXTERNAL_STORAGE',
    CAMERA: 'android.permission.CAMERA',
    READ_MEDIA_IMAGES: 'android.permission.READ_MEDIA_IMAGES',
  },
  requestMultiple: (permissions) => {
    const results = {};
    permissions.forEach(p => results[p] = 'granted');
    return Promise.resolve(results);
  }
};

// Reanimated Mock
export const useAnimatedStyle = () => ({});
export const useSharedValue = (val) => ({ value: val });
export const withTiming = (val) => val;
export const withSpring = (val) => val;
export const runOnJS = (fn) => fn;
export const interpolate = (v, i, o) => v;
export const Extrapolate = { CLAMP: 'clamp' };

export default {
  View: MockComponent,
  Text: MockComponent,
  ScrollView: MockComponent,
  Image: MockComponent,
};
