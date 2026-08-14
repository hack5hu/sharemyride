import { StateStorage } from 'zustand/middleware';
import { createMMKV } from 'react-native-mmkv';
import { MMKV_ENCRYPTION_KEY } from '@env';

const getEncryptionKey = (): string => {
  if (MMKV_ENCRYPTION_KEY) {
    return MMKV_ENCRYPTION_KEY;
  }

  if (__DEV__) {
    return 'development-only-mmkv-key';
  }

  throw new Error(
    'MMKV_ENCRYPTION_KEY must be configured for production builds.',
  );
};

export const storage = createMMKV({
  id: 'tuktuk-auth-storage',
  encryptionKey: getEncryptionKey(),
});

export const mmkvStorage: StateStorage = {
  setItem: (name, value) => storage.set(name, value),
  getItem: name => storage.getString(name) ?? null,
  removeItem: name => {
    storage.remove(name);
  },
};
