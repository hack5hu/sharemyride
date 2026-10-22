export enum TrackingReason {
  NONE = 'NONE',
  USER = 'USER',
  INELIGIBLE = 'INELIGIBLE',
  AUTH = 'AUTH',
  PERMISSION = 'PERMISSION',
  LOCATION_DISABLED = 'LOCATION_DISABLED',
  UNAVAILABLE = 'UNAVAILABLE',
  EXPIRED = 'EXPIRED',
  OFFLINE = 'OFFLINE',
  WAITING = 'WAITING',
}

export enum LiveRideStatus {
  CREATED = 'CREATED',
  SCHEDULED = 'SCHEDULED',
  CONFIRMED = 'CONFIRMED',
  STARTED = 'STARTED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export enum AppVisibility { ACTIVE = 'active' }
export enum LocationPlatform { ANDROID = 'android', IOS = 'ios' }

export enum TrackingDisplayStatus {
  CONNECTING = 'connecting',
  LIVE = 'live',
  DELAYED = 'delayed',
  OFFLINE = 'offline',
  PAUSED = 'paused',
  AUTH_REQUIRED = 'authRequired',
  PERMISSION_REQUIRED = 'permissionRequired',
  UNAVAILABLE = 'unavailable',
}
