import { ENABLE_NETWORK_LOGGER } from '@env';

const REDACTED_VALUE = '[REDACTED]';
const FORM_DATA_VALUE = '[FORM_DATA]';

const SENSITIVE_KEY_PARTS = [
  'authorization',
  'token',
  'password',
  'otp',
  'phone',
  'secret',
  'credential',
  'key',
];

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasToJSON = (value: unknown): value is { toJSON: () => unknown } =>
  isRecord(value) && typeof value.toJSON === 'function';

const isFormDataValue = (value: unknown): boolean =>
  typeof FormData !== 'undefined' && value instanceof FormData;

const isSensitiveKey = (key: string): boolean => {
  const normalizedKey = key.toLowerCase();
  return SENSITIVE_KEY_PARTS.some(part => normalizedKey.includes(part));
};

export const isNetworkLoggerEnabled = (): boolean =>
  __DEV__ && ENABLE_NETWORK_LOGGER === 'true';

export const redactSensitiveData = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (isFormDataValue(value)) {
    return FORM_DATA_VALUE;
  }

  if (Array.isArray(value)) {
    return value.map(item => redactSensitiveData(item));
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.entries(value).reduce<JsonRecord>((acc, [key, item]) => {
    acc[key] = isSensitiveKey(key) ? REDACTED_VALUE : redactSensitiveData(item);
    return acc;
  }, {});
};

export const sanitizeHeaders = (headers: unknown): JsonRecord => {
  const headerSource = hasToJSON(headers) ? headers.toJSON() : headers;

  if (!isRecord(headerSource)) {
    return {};
  }

  return Object.entries(headerSource).reduce<JsonRecord>((acc, [key, value]) => {
    acc[key] = isSensitiveKey(key) ? REDACTED_VALUE : value;
    return acc;
  }, {});
};
