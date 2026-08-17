# AGENTS.md - Hamsafar Project Rules, Memory & Vibrant Fintech Design System

> **Notice**: Expo HAS CHANGED. Read the exact versioned docs at https://docs.expo.dev/versions/v54.0.0/ before writing any code.

---

## 1. System Instructions & Rules

### Expo SDK 54 & Expo Router Rules
- **SDK Version**: Expo 54.0.x with React 19 and React Native 0.81.
- **Routing**: Use file-based routing with `expo-router`. Navigation files belong in `app/`.
- **Vector Icons**: Use `@expo/vector-icons` (e.g., `Ionicons`, `Feather`, `MaterialCommunityIcons`).
- **Secure Persistence**: Use `expo-secure-store` for sensitive user tokens / auth state storage in React Native.
- **Styling**: Standard React Native `StyleSheet.create` combined with centralized design tokens in `src/constants/theme.ts`.
- **Single Source of Truth for Theme Colors**: In all screens and components, use colors strictly from `src/constants/theme.ts`. Never use hardcoded hex/rgba strings directly in component files. If a required color or token is missing, add it to `src/constants/theme.ts` first and then consume it in the UI.
- **Custom Background Mandatory Rule**: EVERY screen in the application MUST use our custom background (`ScreenWrapper` component which provides the Stitch linear gradient `['#ffe5d4', '#f0f7fb', '#d5f7ed']`). Never render plain unstyled or hardcoded background views.
- **Centralized i18n Translation Mandatory Rule**: ALL user-facing text in components and screens MUST be fetched from the centralized translation files located in `src/i18n/` (`en.ts` for English, `hi.ts` for Hindi, `mr.ts` for Marathi). Never hardcode display text strings directly in component UI. All supported languages are LTR.
- **Tab Bar Design Finalized Rule**: The bottom tab bar design (`StitchTabBar.tsx` with floating frosted glass blur and center spinning FAB) is finalized and MUST NOT be modified.
- **Messages Tab & Conversation Card Rule**: The Message tab must feature a search input bar, horizontal online match avatars, and a vertical list of conversations using a dedicated reusable `ConversationCard` component (`src/components/messages/ConversationCard.tsx`).
- **ScreenWrapper Keyboard & Scroll Handling Rule**: All screens requiring keyboard avoidance or scrolling must utilize `ScreenWrapper`'s built-in `keyboardAvoiding={true}` (enabled by default) and/or `scrollable={true}` props. Use `keyboardOffset` for screen-specific spacing. Do NOT add local ad-hoc `KeyboardAvoidingView` wrappers in individual screens.

---

## 2. Project Memory & Technology Stack

### Application Overview: Hamsafar (हमसफ़र)
Hamsafar is a premium Shadi / Matrimonial Connection & Matchmaking application built using React Native Expo and Supabase, styled strictly according to the **Stitch Vibrant Fintech System**.

### Primary Technology Stack
- **Frontend**: React Native Expo (SDK 54), Expo Router, TypeScript.
- **Backend & Auth**: Supabase (PostgreSQL, Row Level Security, Supabase Auth with SecureStore persistence).
- **UI Design System**: Stitch Vibrant Fintech System.
  - **Stitch Project URL**: [https://stitch.withgoogle.com/u/1/projects/7506002916552087860](https://stitch.withgoogle.com/u/1/projects/7506002916552087860)
  - **Stitch Project ID**: `7506002916552087860`

---

## 3. Vibrant Fintech System Tokens & Guidelines (MANDATORY)

```yaml
name: Vibrant Fintech System
colors:
  surface: '#f4fafd'
  surface-dim: '#d4dbdd'
  surface-bright: '#f4fafd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef5f7'
  surface-container: '#e8eff1'
  surface-container-high: '#e2e9ec'
  surface-container-highest: '#dde4e6'
  on-surface: '#161d1f'
  on-surface-variant: '#5a4136'
  inverse-surface: '#2b3234'
  inverse-on-surface: '#ebf2f4'
  outline: '#8e7164'
  outline-variant: '#e3bfb1'
  surface-tint: '#a33e00'
  primary: '#a33e00'
  on-primary: '#ffffff'
  primary-container: '#ff6600'
  on-primary-container: '#561d00'
  inverse-primary: '#ffb596'
  secondary: '#006b55'
  on-secondary: '#ffffff'
  secondary-container: '#6dfad2'
  on-secondary-container: '#00725b'
  tertiary: '#655d4f'
  on-tertiary: '#ffffff'
  tertiary-container: '#9f9685'
  on-tertiary-container: '#352f22'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  background: '#f4fafd'
  on-background: '#161d1f'
  surface-variant: '#dde4e6'
typography:
  fontFamily: Plus Jakarta Sans
  headline-lg: 24px (bold / 700)
  headline-md: 20px (semi-bold / 600)
  body-lg: 16px (regular / 400)
  body-md: 14px (regular / 400)
  label-lg: 14px (semi-bold / 600)
  label-sm: 12px (medium / 500)
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  marginMobile: 16px
  marginDesktop: 40px
```

### Key Design Principles:
1. **Primary Accent (#ff6600 / #a33e00)**: Used for main buttons, primary CTA, active tab indicators, and key icons.
2. **Secondary Accent (#006b55 / #6dfad2)**: Used for verified badges, success indicators, and secondary accents.
3. **Surfaces**: Pure white (`#ffffff`) containers floating over soft `#f4fafd` background with ambient soft depth shadow (`y: 4px, blur: 12px, opacity: 0.05`).
4. **Shapes & Padding**: Cards use 16px (`rounded-lg`) corner radius and 16px internal padding. Buttons use 8px (`rounded-md`) or full pill radius (`rounded-full`).

---

## 4. Supabase Database Schema Blueprint

```sql
-- Profiles table (Matrimonial details)
create table profiles (
  id uuid references auth.users not null primary key,
  full_name text not null,
  gender text check (gender in ('male', 'female')),
  date_of_birth date not null,
  religion text,
  mother_tongue text,
  profession text,
  education text,
  city text,
  state text,
  country text default 'India',
  bio text,
  height_cm integer,
  marital_status text default 'never_married',
  horoscope_astro text,
  photo_urls text[] default '{}',
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Partner Match Preferences table
create table match_preferences (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade not null unique,
  min_age integer default 21,
  max_age integer default 35,
  min_height_cm integer,
  max_height_cm integer,
  religions text[] default '{}',
  mother_tongues text[] default '{}',
  marital_statuses text[] default '{}',
  preferred_cities text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Expressed Interests / Likes
create table interests (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references profiles(id) on delete cascade not null,
  receiver_id uuid references profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'accepted', 'declined')) default 'pending',
  message text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(sender_id, receiver_id)
);

-- Active Matches (Mutual Connection)
create table matches (
  id uuid default gen_random_uuid() primary key,
  user1_id uuid references profiles(id) on delete cascade not null,
  user2_id uuid references profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user1_id, user2_id)
);

-- Chat Messages
create table messages (
  id uuid default gen_random_uuid() primary key,
  match_id uuid references matches(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```
