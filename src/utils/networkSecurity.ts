type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasToJSON = (value: unknown): value is { toJSON: () => unknown } =>
  isRecord(value) && typeof value.toJSON === 'function';

export const isNetworkLoggerEnabled = (): boolean => true;

export const redactSensitiveData = (value: unknown): unknown => {
  if (value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => redactSensitiveData(item));
  }

  if (!isRecord(value)) {
    return value;
  }

  return Object.entries(value).reduce<JsonRecord>((acc, [key, item]) => {
    acc[key] = redactSensitiveData(item);
    return acc;
  }, {});
};

export const sanitizeHeaders = (headers: unknown): JsonRecord => {
  const headerSource = hasToJSON(headers) ? headers.toJSON() : headers;

  if (!isRecord(headerSource)) {
    return {};
  }

  return Object.entries(headerSource).reduce<JsonRecord>(
    (acc, [key, value]) => {
      acc[key] = value;
      return acc;
    },
    {},
  );
};
