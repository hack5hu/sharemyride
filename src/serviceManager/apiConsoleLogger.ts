import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { sanitizeHeaders } from '@/utils/networkSecurity';
import { Logger } from '@/utils/logger';

type HeaderRecord = Record<string, unknown>;
type JsonRecord = Record<string, unknown>;

const FORM_DATA_VALUE = '[FORM_DATA]';
const REDACTED_VALUE = '[REDACTED]';
const CONSOLE_REDACTED_KEY_PARTS = [
  'password',
  'otp',
  'secret',
  'credential',
  'key',
  'token',
  'authorization',
];

const getMethod = (method?: string): string => (method || 'GET').toUpperCase();

const hasToJSON = (value: unknown): value is { toJSON: () => unknown } =>
  typeof value === 'object' &&
  value !== null &&
  'toJSON' in value &&
  typeof value.toJSON === 'function';

const toHeaderRecord = (headers: unknown): HeaderRecord => {
  const headerSource = hasToJSON(headers) ? headers.toJSON() : headers;

  if (typeof headerSource !== 'object' || headerSource === null || Array.isArray(headerSource)) {
    return {};
  }

  return headerSource as HeaderRecord;
};

const getAuthorizationToken = (headers: unknown): string | undefined => {
  const headerRecord = toHeaderRecord(headers);
  const authorizationEntry = Object.entries(headerRecord).find(
    ([key]) => key.toLowerCase() === 'authorization',
  );

  return authorizationEntry ? String(authorizationEntry[1]) : undefined;
};

const isRecord = (value: unknown): value is JsonRecord =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isFormDataValue = (value: unknown): boolean =>
  typeof FormData !== 'undefined' && value instanceof FormData;

const shouldRedactConsoleKey = (key: string): boolean => {
  const normalizedKey = key.toLowerCase();
  return CONSOLE_REDACTED_KEY_PARTS.some(part => normalizedKey.includes(part));
};

const redactConsoleData = (value: unknown): unknown => {
  if (value === null || value === undefined) return value;
  if (isFormDataValue(value)) return FORM_DATA_VALUE;
  if (Array.isArray(value)) return value.map(item => redactConsoleData(item));
  if (!isRecord(value)) return value;

  return Object.entries(value).reduce<JsonRecord>((acc, [key, item]) => {
    acc[key] = shouldRedactConsoleKey(key) ? REDACTED_VALUE : redactConsoleData(item);
    return acc;
  }, {});
};

export const logApiRequest = (config: InternalAxiosRequestConfig) => {
  if (!__DEV__) return;

  Logger.log('[API Request]', `${getMethod(config.method)} ${config.url}`);
  Logger.log('[API Token]', getAuthorizationToken(config.headers) || 'No token');
  Logger.log('[API Headers]', sanitizeHeaders(config.headers));
  Logger.log('[API Request Body]', redactConsoleData(config.data));
};

export const logApiResponse = (response: AxiosResponse) => {
  if (!__DEV__) return;

  Logger.log(
    '[API Response]',
    `${getMethod(response.config.method)} ${response.config.url} ${response.status}`,
  );
  Logger.log('[API Response Body]', redactConsoleData(response.data));
};

export const logApiError = (error: AxiosError) => {
  if (!__DEV__) return;

  Logger.error(
    '[API Error]',
    `${getMethod(error.config?.method)} ${error.config?.url} ${error.response?.status || 0}`,
  );
  Logger.error('[API Token]', getAuthorizationToken(error.config?.headers) || 'No token');
  Logger.error('[API Error Response]', redactConsoleData(error.response?.data || error.message));
};
