---
name: supabase-backend
description: Supabase Auth setup, Row Level Security (RLS) policies, database table structure, and data access helpers for Hamsafar.
---

# Supabase Backend Skill for Hamsafar

This skill provides patterns, client initialization guidelines, and SQL table structures for the Supabase backend.

## 1. Client Setup in React Native Expo

```typescript
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => SecureStore.getItemAsync(key),
  setItem: (key: string, value: string) => SecureStore.setItemAsync(key, value),
  removeItem: (key: string) => SecureStore.deleteItemAsync(key),
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

## 2. Row Level Security (RLS) Policies

### Profiles Security
- Public Read for authenticated users: `CREATE POLICY "Profiles are viewable by authenticated users" ON profiles FOR SELECT TO authenticated USING (true);`
- User Update: `CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);`

### Interests Security
- Users can insert interests where `sender_id = auth.uid()`.
- Users can view interests sent to or received by them (`auth.uid() = sender_id OR auth.uid() = receiver_id`).

### Matches & Messages Security
- Users can view messages in matches they are part of (`auth.uid() = user1_id OR auth.uid() = user2_id`).
