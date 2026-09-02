import { type RouteProp } from '@react-navigation/native';
import { type StackNavigationProp } from '@react-navigation/stack';
import { type RootStackParamList } from '@/navigation/types.d';

export type UserProfileDetailNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UserProfileDetail'
>;
export type UserProfileDetailRouteProp = RouteProp<
  RootStackParamList,
  'UserProfileDetail'
>;

export interface UserProfileDetailProps {
  navigation: UserProfileDetailNavigationProp;
  route: UserProfileDetailRouteProp;
}

export interface UserReview {
  id: string;
  reviewerName: string;
  reviewerImage?: string;
  rating: number;
  date: string;
  tripInfo: string;
  comment: string;
}

export interface UserProfile {
  id: string;
  name: string;
  phoneNumber?: string;
  profileImage?: string;
  bio?: string;
  isVerified: boolean;
  rating: number;
  ratingCount: number;
  ridesCount?: number;
  preferences: {
    icon: string;
    label: string;
  }[];
  vehicle?: {
    model: string;
    color: string;
    plateNumber: string;
    type: 'electric' | 'petrol' | 'diesel';
    tag?: string;
  };
  reviews: UserReview[];
}
