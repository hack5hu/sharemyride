/**
 * Mock for react-native-device-info in Storybook (Web platform)
 */
export const getUniqueId = () => Promise.resolve('storybook-mock-device-id');
export const getAndroidId = () => Promise.resolve('storybook-mock-android-id');
export const getDeviceId = () => 'mock-device';
export const getSystemName = () => 'Web';
export const getSystemVersion = () => '1.0';
export const getBrand = () => 'Storybook';
export const getModel = () => 'Web Browser';
export const getVersion = () => '1.0.0';
export const getBuildNumber = () => '1';
export const isEmulator = () => Promise.resolve(true);

export default {
  getUniqueId,
  getAndroidId,
  getDeviceId,
  getSystemName,
  getSystemVersion,
  getBrand,
  getModel,
  getVersion,
  getBuildNumber,
  isEmulator,
};
