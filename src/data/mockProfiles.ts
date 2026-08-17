export interface MatrimonialProfile {
  id: string;
  fullName: string;
  age: number;
  gender: 'male' | 'female';
  profession: string;
  education: string;
  city: string;
  state: string;
  religion: string;
  caste?: string;
  motherTongue: string;
  heightCm: number;
  heightFeet: string;
  maritalStatus: string;
  bio: string;
  horoscopeAstro: string;
  manglik: boolean;
  photoUrls: string[];
  isVerified: boolean;
  matchScore: number;
}

export interface InterestItem {
  id: string;
  profile: MatrimonialProfile;
  status: 'pending' | 'accepted' | 'declined';
  type: 'received' | 'sent';
  timestamp: string;
  message?: string;
}

export interface MessageConversation {
  id: string;
  matchId: string;
  profile: MatrimonialProfile;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

export const CURRENT_USER_PROFILE: MatrimonialProfile = {
  id: 'user_me',
  fullName: 'Rahul Sharma',
  age: 28,
  gender: 'male',
  profession: 'Senior Software Engineer',
  education: 'B.Tech in Computer Science',
  city: 'Mumbai',
  state: 'Maharashtra',
  religion: 'Hindu',
  caste: 'Brahmin',
  motherTongue: 'Hindi',
  heightCm: 178,
  heightFeet: "5'10\"",
  maritalStatus: 'neverMarried',
  bio: 'Passionate software architect, travel enthusiast, and classical music lover looking for an understanding and cheerful life partner.',
  horoscopeAstro: 'Kanya Rashi (Virgo) - Uttara Phalguni Nakshatra',
  manglik: false,
  photoUrls: [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
  ],
  isVerified: true,
  matchScore: 100,
};

export const MOCK_PROFILES: MatrimonialProfile[] = [
  {
    id: 'prof_1',
    fullName: 'Ananya Deshmukh',
    age: 26,
    gender: 'female',
    profession: 'Architect & Interior Designer',
    education: 'M.Arch, JJ School of Art',
    city: 'Pune',
    state: 'Maharashtra',
    religion: 'Hindu',
    caste: 'Maratha',
    motherTongue: 'Marathi',
    heightCm: 165,
    heightFeet: "5'5\"",
    maritalStatus: 'neverMarried',
    bio: 'Creative soul who loves heritage architecture, coffee dates, and weekend treks in Sahyadri.',
    horoscopeAstro: 'Simha Rashi (Leo) - Magha Nakshatra',
    manglik: false,
    photoUrls: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    ],
    isVerified: true,
    matchScore: 94,
  },
  {
    id: 'prof_2',
    fullName: 'Priya Verma',
    age: 27,
    gender: 'female',
    profession: 'Chartered Accountant (CA)',
    education: 'ICAI, B.Com (Hons)',
    city: 'Mumbai',
    state: 'Maharashtra',
    religion: 'Hindu',
    caste: 'Agarwal',
    motherTongue: 'Hindi',
    heightCm: 162,
    heightFeet: "5'4\"",
    maritalStatus: 'neverMarried',
    bio: 'Finance professional with a knack for culinary experiments and badminton. Value family traditions and modern growth.',
    horoscopeAstro: 'Tula Rashi (Libra) - Chitra Nakshatra',
    manglik: false,
    photoUrls: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    ],
    isVerified: true,
    matchScore: 91,
  },
  {
    id: 'prof_3',
    fullName: 'Dr. Sneha Kulkarni',
    age: 28,
    gender: 'female',
    profession: 'MD Pediatrics',
    education: 'KEM Hospital, Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    religion: 'Hindu',
    caste: 'Brahmin',
    motherTongue: 'Marathi',
    heightCm: 168,
    heightFeet: "5'6\"",
    maritalStatus: 'neverMarried',
    bio: 'Pediatric doctor dedicated to healthcare. Love Hindustani classical vocals, gardening, and peaceful long drives.',
    horoscopeAstro: 'Makar Rashi (Capricorn) - Shravana Nakshatra',
    manglik: false,
    photoUrls: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    ],
    isVerified: true,
    matchScore: 88,
  },
  {
    id: 'prof_4',
    fullName: 'Riya Malhotra',
    age: 25,
    gender: 'female',
    profession: 'Product Manager',
    education: 'MBA, IIM Bangalore',
    city: 'Bengaluru',
    state: 'Karnataka',
    religion: 'Hindu',
    caste: 'Khatri',
    motherTongue: 'Hindi',
    heightCm: 160,
    heightFeet: "5'3\"",
    maritalStatus: 'neverMarried',
    bio: 'Tech enthusiast building consumer products. Enjoy yoga, indie films, and exploring new cafes.',
    horoscopeAstro: 'Vrishabha Rashi (Taurus) - Rohini Nakshatra',
    manglik: false,
    photoUrls: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    ],
    isVerified: false,
    matchScore: 85,
  },
];

export const MOCK_INTERESTS: InterestItem[] = [
  {
    id: 'int_1',
    profile: MOCK_PROFILES[0], // Ananya
    status: 'pending',
    type: 'received',
    timestamp: '2 hours ago',
    message: 'Hi Rahul! Impressed by your bio. Would love to connect!',
  },
  {
    id: 'int_2',
    profile: MOCK_PROFILES[1], // Priya
    status: 'accepted',
    type: 'received',
    timestamp: 'Yesterday',
    message: 'Hello! Our families share similar cultural values.',
  },
  {
    id: 'int_3',
    profile: MOCK_PROFILES[2], // Sneha
    status: 'pending',
    type: 'sent',
    timestamp: '3 days ago',
    message: 'Expressing interest in your profile.',
  },
];

export const MOCK_CONVERSATIONS: MessageConversation[] = [
  {
    id: 'conv_1',
    matchId: 'match_1',
    profile: MOCK_PROFILES[1], // Priya
    lastMessage: 'Sounds great! Are you free for a call this weekend?',
    timestamp: '10:42 AM',
    unreadCount: 2,
  },
  {
    id: 'conv_2',
    matchId: 'match_2',
    profile: MOCK_PROFILES[0], // Ananya
    lastMessage: 'Thanks for connecting! I also love classical music.',
    timestamp: 'Yesterday',
    unreadCount: 0,
  },
];
