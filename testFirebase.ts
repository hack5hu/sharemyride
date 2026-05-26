import { getMessaging, requestPermission } from '@react-native-firebase/messaging';
const m = getMessaging();
requestPermission(m);
