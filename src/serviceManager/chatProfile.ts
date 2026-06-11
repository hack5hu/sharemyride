import { useChatStore } from '@/store/useChatStore';
import { UserProfile } from '@/types/chat';
import { Logger } from '@/utils/logger';
import { userService } from './userService';

interface RemoteUserProfile {
  name?: string;
  fullName?: string;
  profileImage?: {
    uri?: string;
  };
  avatarUri?: string;
  rating?: number;
  isVerified?: boolean;
}

export const fetchChatUserProfile = async (
  userId: string,
): Promise<UserProfile | undefined> => {
  if (!userId || userId === 'Unknown') return undefined;

  const { users, upsertUser } = useChatStore.getState();
  if (users[userId]) return users[userId];

  try {
    const profile = (await userService.getUserProfile(
      userId,
    )) as RemoteUserProfile;
    if (!profile) return undefined;

    const userData: UserProfile = {
      userId,
      name: profile.name || profile.fullName || `User ${userId.slice(0, 8)}`,
      avatarUri: profile.profileImage?.uri || profile.avatarUri,
      rating: profile.rating,
      isVerified: profile.isVerified,
    };
    upsertUser(userData);
    return userData;
  } catch (error) {
    Logger.error(`Failed to fetch profile for user ${userId}:`, error);
    return undefined;
  }
};
