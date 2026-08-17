export type Gender = 'male' | 'female';
export type InterestStatus = 'pending' | 'accepted' | 'declined';
export type MaritalStatus = 'never_married' | 'divorced' | 'widowed' | 'awaiting_divorce';

export interface Profile {
  id: string;
  full_name: string;
  gender: Gender;
  date_of_birth: string;
  religion: string | null;
  mother_tongue: string | null;
  profession: string | null;
  education: string | null;
  city: string | null;
  state: string | null;
  country: string;
  bio: string | null;
  height_cm: number | null;
  marital_status: MaritalStatus;
  horoscope_astro: string | null;
  photo_urls: string[];
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface MatchPreference {
  id: string;
  user_id: string;
  min_age: number;
  max_age: number;
  min_height_cm: number | null;
  max_height_cm: number | null;
  religions: string[];
  mother_tongues: string[];
  marital_statuses: MaritalStatus[];
  preferred_cities: string[];
  created_at: string;
}

export interface Interest {
  id: string;
  sender_id: string;
  receiver_id: string;
  status: InterestStatus;
  message: string | null;
  created_at: string;
  sender_profile?: Profile;
  receiver_profile?: Profile;
}

export interface Match {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  partner_profile?: Profile;
}

export interface Message {
  id: string;
  match_id: string;
  sender_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}
