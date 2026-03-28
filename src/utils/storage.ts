import { StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';

// SECURITY NOTE: Replace this static key with a device-unique value in production.
// Options: derive from react-native-keychain, generate once on first install,
// or use react-native-sensitive-info. Never commit production keys to source control.
export const storage = createMMKV({
  id: 'tuktuk-auth-storage',
  encryptionKey: 'hunter2',
});

export const mmkvStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: name => storage.getString(name) ?? null,
  removeItem: name => {
    storage.remove(name);
  },
};
