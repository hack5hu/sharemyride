import analytics from '@react-native-firebase/analytics';
import { Logger } from '@/utils/logger';

export enum AnalyticsEvent {
  SCREEN_VIEW = 'screen_view',
  API_SUCCESS = 'api_success',
  API_ERROR = 'api_error',
  RIDE_BOOKED = 'ride_booked',
  RIDE_PUBLISHED = 'ride_published',
  PROFILE_UPDATED = 'profile_updated',
  USER_LOGOUT = 'user_logout',
  RIDE_CANCELLED = 'ride_cancelled',
  PREFERENCES_UPDATED = 'preferences_updated',
  VEHICLE_ADDED = 'vehicle_added',
  CHAT_MESSAGE_SENT = 'chat_message_sent',
  USER_LOGIN = 'user_login',
  SEARCH_RIDE = 'search_ride',
}

class AnalyticsServiceImpl {
  public async logEvent(
    eventName: AnalyticsEvent | string,
    params?: Record<string, any>,
  ): Promise<void> {
    try {
      await analytics().logEvent(eventName, params);
      Logger.info(`[Analytics] Event Logged: ${eventName}`, params);
    } catch (error) {
      Logger.error(`[Analytics] Failed to log event: ${eventName}`, error);
    }
  }

  public async logScreenView(
    screenName: string,
    screenClass: string = screenName,
  ): Promise<void> {
    try {
      await analytics().logScreenView({
        screen_name: screenName,
        screen_class: screenClass,
      });
      Logger.info(`[Analytics] Screen View: ${screenName}`);
    } catch (error) {
      Logger.error(`[Analytics] Failed to log screen view: ${screenName}`, error);
    }
  }

  public async setUser(userId: string): Promise<void> {
    try {
      await analytics().setUserId(userId);
      Logger.info(`[Analytics] User ID set: ${userId}`);
    } catch (error) {
      Logger.error(`[Analytics] Failed to set user ID: ${userId}`, error);
    }
  }

  public async clearUser(): Promise<void> {
    try {
      await analytics().setUserId(null);
      Logger.info(`[Analytics] User ID cleared`);
    } catch (error) {
      Logger.error(`[Analytics] Failed to clear user ID`, error);
    }
  }

  public async setUserProperty(name: string, value: string): Promise<void> {
    try {
      await analytics().setUserProperty(name, value);
    } catch (error) {
      Logger.error(
        `[Analytics] Failed to set user property: ${name}=${value}`,
        error,
      );
    }
  }
}

export const AnalyticsService = new AnalyticsServiceImpl();
