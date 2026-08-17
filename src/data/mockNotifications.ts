import { MOCK_PROFILES, MatrimonialProfile } from './mockProfiles';

export interface NotificationItemData {
  id: string;
  type: 'interest' | 'match' | 'message' | 'verification';
  profile?: MatrimonialProfile;
  title: string;
  time: string;
  isUnread: boolean;
  actionType?: 'accept' | 'view' | 'reply';
}

export const MOCK_NOTIFICATIONS: NotificationItemData[] = [
  {
    id: 'notif_1',
    type: 'interest',
    profile: MOCK_PROFILES[0], // Ananya
    title: 'Ananya Deshmukh expressed interest in your profile.',
    time: '10 mins ago',
    isUnread: true,
    actionType: 'accept',
  },
  {
    id: 'notif_2',
    type: 'match',
    profile: MOCK_PROFILES[1], // Priya
    title: 'You have a new mutual match with Priya Verma!',
    time: '2 hours ago',
    isUnread: true,
    actionType: 'reply',
  },
  {
    id: 'notif_3',
    type: 'message',
    profile: MOCK_PROFILES[0], // Ananya
    title: 'Ananya Deshmukh sent you a new message.',
    time: '5 hours ago',
    isUnread: false,
    actionType: 'reply',
  },
  {
    id: 'notif_4',
    type: 'verification',
    title: 'Your profile ID verification has been approved!',
    time: '1 day ago',
    isUnread: false,
    actionType: 'view',
  },
  {
    id: 'notif_5',
    type: 'interest',
    profile: MOCK_PROFILES[2], // Sneha
    title: 'Dr. Sneha Kulkarni expressed interest in your profile.',
    time: '2 days ago',
    isUnread: false,
    actionType: 'accept',
  },
];
