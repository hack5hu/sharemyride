/**
 * Project-wide TypeScript Enums
 * Central source of truth for all statuses, types, and modes.
 */

export enum MessageStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  FAILED = 'FAILED',
}

export enum MessageType {
  TEXT = 'text',
  LOCATION = 'location',
  IMAGE = 'image',
}

export enum ConnectionStatus {
  CONNECTING = 'CONNECTING',
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED',
}
