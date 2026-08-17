# 🔬 Hamsafar — Deep Code-Level Overview

Every source file, every component, every data flow — broken down line by line.

---

## 1. App Entry & Navigation Architecture

### Boot Flow

```
app/index.tsx → Redirect to /(tabs) → TabLayout renders StitchTabBar
```

#### [`app/index.tsx`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/app/index.tsx)
```tsx
// Literally just a redirect. No auth check, no splash logic yet.
export default function Index() {
  return <Redirect href="/(tabs)" />;
}
```

> ⚠️ **Gap**: No auth guard here. When auth is added, this is where you'd check session and redirect to login/signup vs tabs.

---

#### [`app/_layout.tsx`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/app/_layout.tsx) — Root Stack

```tsx
<LanguageProvider>          // ← wraps ENTIRE app in i18n context
  <StatusBar style="dark" />
  <Stack screenOptions={{
    headerShown: false,     // ← all screens use custom headers
    contentStyle: { backgroundColor: Theme.colors.background },
    animation: "slide_from_right",
  }}>
    <Stack.Screen name="(tabs)" />
    <Stack.Screen name="chat/[id]" options={{ presentation: "card" }} />
    <Stack.Screen name="notifications/index" options={{ presentation: "card" }} />
    <Stack.Screen name="profile/edit" options={{ animation: "slide_from_bottom" }} />
  </Stack>
</LanguageProvider>
```

**Key points:**
- `LanguageProvider` is the outermost wrapper — every screen gets `useTranslation()`
- 4 routes: tabs group + 3 standalone stack screens
- `profile/edit` slides from bottom (modal feel), rest slide from right
- No `headerShown: true` anywhere — all headers are custom React components

---

#### [`app/(tabs)/_layout.tsx`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/app/(tabs)/_layout.tsx) — Tab Navigator

```tsx
<Tabs
  tabBar={(props) => <StitchTabBar {...props} />}  // ← completely custom tab bar
  screenOptions={{ headerShown: false }}
>
  <Tabs.Screen name="index" />       // Home
  <Tabs.Screen name="matches" />     // Matches
  <Tabs.Screen name="connections" /> // Connections (center FAB)
  <Tabs.Screen name="messages" />    // Messages
  <Tabs.Screen name="profile" />     // Profile
</Tabs>
```

**All 5 tab screens are thin wrappers** — they just render a `<XxxContent />` component from `src/components/`:

```tsx
// Example: app/(tabs)/index.tsx
export default function HomeScreen() {
  return <HomeContent />;
}
```

This pattern is consistent across all tabs. The real logic lives in `src/components/<feature>/`.

---

## 2. Shared Infrastructure Components

### [`ScreenWrapper`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/common/ScreenWrapper.tsx)

**Used by**: Every single screen in the app.

```
Props:
├── showAppHeader?: boolean  → renders HamsafarAppHeader (tab screens)
├── showHeader?: boolean     → renders back button + title (stack screens)
├── title?: string
├── showBackButton?: boolean (default true)
├── bgWhite?: boolean        → overrides gradient with solid white
├── backgroundColor?: string → custom solid bg
├── rightAction?: ReactNode  → right side of header (e.g., "Save" button)
├── statusBarStyle?: "dark" | "light"
└── style, contentStyle
```

**Render logic:**
1. Wraps everything in a `LinearGradient` with the Stitch gradient: `['#ffe5d4', '#f0f7fb', '#d5f7ed']`
2. Adds `SafeAreaInsets.top` spacing manually
3. Optionally renders `HamsafarAppHeader` (for tab screens) OR a custom header bar with back button (for stack screens)
4. Children go inside a `flex: 1` content View

**Gradient override logic (L58-62):**
```tsx
const gradientColors = bgWhite
  ? [white, white]                      // solid white
  : backgroundColor
    ? [backgroundColor, backgroundColor] // custom solid
    : Theme.colors.backgroundGradient;   // default saffron→blue→mint
```

---

### [`HamsafarAppHeader`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/common/HamsafarAppHeader.tsx)

Shown on all 5 tab screens via `showAppHeader` prop.

**Layout:**
```
[User Avatar (44px circle, orange border)] [App Name "Hamsafar" + tagline] ......... [🔍 Search] [🔔 Bell]
```

- Avatar loads from `CURRENT_USER_PROFILE.photoUrls[0]` (mock data)
- Bell button navigates to `/notifications` via `router.push('/notifications')`
- Search button has no handler yet (empty `TouchableOpacity`)
- Orange notification dot is always visible (hardcoded, no unread count logic)

---

### [`StitchTabBar`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/common/StitchTabBar.tsx) (⚠️ LOCKED — DO NOT MODIFY)

**Architecture:**
```
<View tabContainer>  (absolute positioned at bottom)
  <View floatingWrapper>  (horizontal margins)
    <BlurView intensity={75}>  (frosted glass effect)
      <View tabBar>  (5 tab items in a row)
        [Home] [Matches] [Connections*] [Messages] [Profile]
      </View>
    </BlurView>

    <TouchableOpacity floatingFabOverlay>  (absolute, centered, z-index 10)
      <SpinningConnectionsFab />
    </TouchableOpacity>
  </View>
</View>
```

**Icon mapping (filled vs outline based on `isFocused`):**
| Route | Focused | Unfocused |
|-------|---------|-----------|
| `index` | `home` | `home-outline` |
| `matches` | `heart` | `heart-outline` |
| `connections` | Center FAB (always shown) | Center FAB |
| `messages` | `forum` | `forum-outline` |
| `profile` | `account` | `account-outline` |

**Tab labels** use `t('tabs.xxx')` — fully localized.

---

### [`SpinningConnectionsFab`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/common/SpinningConnectionsFab.tsx)

- 50×50 container, 42×42 inner circle (orange `#ff6600`)
- When `isFocused = true`: starts an `Animated.loop` spinning a tri-color border ring (white/orange/mint) at 3s per revolution using native driver
- When unfocused: ring is hidden, just the static orange FAB circle
- Uses old RN `Animated` API (not Reanimated)

---

## 3. Screen-by-Screen Code Breakdown

### 🏠 [`HomeContent`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/home/HomeContent.tsx)

**State**: None (stateless — reads directly from `MOCK_PROFILES`)

**Structure:**
```
ScreenWrapper (showAppHeader)
└── ScrollView (paddingBottom: 110 for tab bar clearance)
    ├── Section 1: "New Matches" — horizontal ScrollView
    │   └── MOCK_PROFILES.map() → <NewMatchAvatarCard />
    └── Section 2: "Top Matches" — vertical feed
        └── MOCK_PROFILES.map() → <UserMatchCard />
```

**No filtering/pagination** — dumps all 4 mock profiles in both sections.

---

### [`NewMatchAvatarCard`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/home/NewMatchAvatarCard.tsx)

**Props:** `{ profile: MatrimonialProfile, onPress?: () => void }`

Fixed 96px wide card:
```
[72×72 avatar circle with orange border]
  └── [verified badge: 18px green circle with checkmark] (if isVerified)
[First Name, Age]
[Profession]
```

---

### [`UserMatchCard`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/home/UserMatchCard.tsx)

**Props:** `{ profile, onInterest?, onShortlist?, onIgnore?, onChat?, onPressProfile? }`

Full-bleed image card (width × 1.55 aspect ratio):
```
[Full background photo]
  [Dark gradient overlay top→bottom]
    [Top right: photo count badge + "Just Joined" pill]
    [Bottom section:]
      "Active Today"
      "Name, Age"
      "Height • City • Religion"
      "Profession • Earns ₹15-20 Lacs p.a" (hardcoded income!)
      "Education"
      ─── divider ───
      "Profile managed by Self"
      [4 circular action buttons: Interest | Shortlist | Ignore | Chat]
```

> ⚠️ Income `"Earns ₹15–20 Lacs p.a"` is hardcoded at L97 — not from profile data.

**Action handlers**: All callbacks are optional and currently **not wired** in `HomeContent.tsx` (no `onInterest`, `onShortlist` etc. passed).

---

### [`ProfileCard`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/home/ProfileCard.tsx)

**Props:** `{ profile, onPass, onConnect, onSuperLike, onPressProfile? }`  
**State:** `photoIndex` — cycles through `profile.photoUrls` on tap

Detailed card layout:
```
[Photo container (95% screen width, with tap-to-next-photo)]
  [Top: pagination dots (Instagram-style bars)]
  [Top left: Verified badge (green pill)]
  [Top right: Match score badge (orange pill, e.g. "94% Match")]
  [Bottom: dark gradient fade]
[Details section:]
  "Name, Age" + verified icon
  Profession (orange text)
  Education (grey text)
  [Spec tags grid: Location | Religion | Height+Status | Horoscope]
  [Bio quote in bordered box] (if bio exists)
[Action footer: Pass | Super Like | Connect]
```

> ℹ️ This component is **NOT used anywhere** currently. `HomeContent` uses `UserMatchCard` instead. `ProfileCard` seems to be an alternative swipe-card design that was built but not integrated.

---

### 💛 [`MatchesContent`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/matches/MatchesContent.tsx)

**State**: None  
**Data**: `MOCK_PROFILES.slice(0, 2)` — only shows first 2 profiles

Simple list of white cards:
```
ScreenWrapper (showAppHeader)
└── ScrollView
    ├── Subtitle text
    └── [matchCard] for each profile:
        [56px avatar] [Name, Age + verified] [Profession] [City, State] ... [Chat Now button]
```

`Chat Now` button has no `onPress` handler.

---

### 🔗 [`ConnectionsContent`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/connections/ConnectionsContent.tsx)

**State:** `activeTab: 'received' | 'sent' | 'accepted'` (default: `'received'`)

**Data:** `MOCK_INTERESTS` (3 items) filtered by tab:
- `received` → type='received' && status='pending'
- `sent` → type='sent'
- `accepted` → status='accepted'

```
ScreenWrapper (showAppHeader)
└── ScrollView
    ├── Segmented control [Received | Sent | Accepted] (orange pill when active)
    └── filteredList.map() → interest cards:
        [50px avatar] [Name, Age] [Profession • City] ["message"] ... [Accept | Decline] (only for received)
```

Accept/Decline buttons have **no handlers** — they're visual only.

---

### 💬 [`MessagesContent`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/messages/MessagesContent.tsx)

**State:**
- `searchQuery: string` — filters conversations by name
- `conversations: MessageConversation[]` — initialized from `MOCK_CONVERSATIONS`

```
ScreenWrapper (showAppHeader)
└── ScrollView
    ├── Search bar (pill-shaped, with clear button)
    ├── Section: "Mutual Matches" — horizontal avatar row
    │   └── MOCK_PROFILES.map() → online avatars (56px, green dot)
    │       onPress → router.push(`/chat/${profile.id}`)
    └── Section: "Messages" — vertical conversation list
        └── filteredConversations.map() → <ConversationCard />
            onPress → router.push(`/chat/${conv.profile.id}`)
```

---

### [`ConversationCard`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/messages/ConversationCard.tsx)

**Props:** `{ conversation: MessageConversation, onPress?: () => void }`

```
[52px avatar + online green dot] [Name (bold)] ........... [timestamp]
                                 [Last message text]      [unread badge (orange)]
```

**Unread styling**: When `unreadCount > 0`:
- Card gets a `3px left orange border`
- Timestamp turns orange + bold
- Last message text turns bold
- Orange circle badge shows count

---

### 👤 [`ProfileContent`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/profile/ProfileContent.tsx)

**State**: None (reads from `useTranslation()` for language switching)

```
ScreenWrapper (showAppHeader)
└── ScrollView (paddingBottom: 100)
    ├── User brief card: [60px avatar] [Name + verified] [Profession] [City, State]
    ├── Section: "User Profile Update"
    │   └── Action card → router.push('/profile/edit')
    └── Section: "Settings"
        └── Language selector card:
            [Language icon] "App Language"
            [English | हिन्दी | मराठी] ← pill buttons
```

**Language switching** calls `setLanguage(langKey)` from `useTranslation()` — instant, no reload needed.

---

### 🔔 [`NotificationsContent`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/notifications/NotificationsContent.tsx)

**State:**
- `activeTab: 'all' | 'interests' | 'matches' | 'system'`
- `notificationsList: NotificationItemData[]` — mutable copy of `MOCK_NOTIFICATIONS`

**Key logic:**
- `handleMarkAllRead()` — maps all items to `isUnread: false`
- Tapping a notification marks just that one as read
- Right header shows "Mark all read" only when `hasUnread = true`

---

### [`NotificationItemCard`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/components/notifications/NotificationItemCard.tsx)

**Badge icon logic** (colored circle overlaying avatar):
| Type | Color | Icon |
|------|-------|------|
| `interest` | orange `#ff6600` | `favorite` |
| `match` | green `#006b55` | `sparkles` |
| `message` | blue `#3b82f6` | `chat-bubble` |
| `verification` | green `#006b55` | `verified` |

**Notification text** is dynamically constructed: `"{Name} {t('notifications.types.{type}')}"` — e.g., "Ananya Deshmukh expressed interest in your profile".

---

### 💬 [`chat/[id].tsx`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/app/chat/[id].tsx) — Full Chat Screen (1013 lines)

**The most complex screen.** This is a full-featured chat with a **contact unlock state machine**.

**Route param:** `id` — looks up profile from `MOCK_PROFILES.find(p => p.id === id)`

**State:**
```tsx
unlockState: 'none' | 'pending' | 'unlocked'  // Contact unlock flow
viewMode: 'sender' | 'receiver'                // Demo toggle to test both sides
isModalVisible: boolean                         // Unlock contact modal
toastMessage: string | null                     // Auto-dismiss toast (2.5s)
inputText: string                               // Message input
chatMessages: { id, sender, text, time }[]      // In-memory chat history
```

**Contact Unlock State Machine:**
```
[none] ──(tap UNLOCK CONTACT)──→ Modal opens
       ──(Send Request)──→ [pending] + toast "Contact request sent"
       
[pending] ──(Sender view: Remind)──→ toast "Reminder sent!"
          ──(Sender view: Cancel)──→ [none] + system message
          ──(Receiver view: Accept)──→ [unlocked] + system message + toast
          ──(Receiver view: Decline)──→ [none] + system message + toast

[unlocked] ──(header shows Call button)──→ Linking.openURL('tel:+919876543210')
```

**Chat UI Structure:**
```
ScreenWrapper (no default header)
├── Custom header: [← Back] [Avatar + Name + "Active Today"] [UNLOCK/REQUESTED/📞]
├── Demo role toggle bar: [Sender (Me)] [Receiver (Name)]
├── Toast banner (auto-dismiss)
└── KeyboardAvoidingView
    ├── ScrollView (message bubbles)
    │   ├── System messages (centered grey pills)
    │   ├── My messages (orange, right-aligned, rounded with flat bottom-right)
    │   └── Their messages (white, left-aligned, rounded with flat bottom-left)
    ├── Floating contact request card (only when pending)
    │   ├── Sender view: "Request sent..." [Remind] [Cancel]
    │   └── Receiver view: "{Name} wants contact" [Accept] [Decline]
    └── Bottom input bar: [➕ Attach] [TextInput] [Send ▶]
```

**Initial mock messages** are hardcoded (4 messages about Jaipur travel).

---

## 4. Data Layer

### [`mockProfiles.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/data/mockProfiles.ts)

**Types defined here (NOT in `database.types.ts`):**

```tsx
MatrimonialProfile {
  id, fullName, age, gender, profession, education,
  city, state, religion, caste?, motherTongue,
  heightCm, heightFeet, maritalStatus, bio,
  horoscopeAstro, manglik, photoUrls[], isVerified, matchScore
}

InterestItem { id, profile, status, type, timestamp, message? }
MessageConversation { id, matchId, profile, lastMessage, timestamp, unreadCount }
```

> ⚠️ **Two separate type systems**: `MatrimonialProfile` in mock data vs `Profile` in [`database.types.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/types/database.types.ts). They have different field names (`fullName` vs `full_name`, `heightCm` vs `height_cm`). Will need mapping when connecting to Supabase.

**Data:**
- `CURRENT_USER_PROFILE` — "Rahul Sharma", 28, Mumbai, Software Engineer
- `MOCK_PROFILES` — 4 female profiles (Ananya, Priya, Dr. Sneha, Riya)
- `MOCK_INTERESTS` — 3 items (1 received/pending, 1 received/accepted, 1 sent/pending)
- `MOCK_CONVERSATIONS` — 2 conversations (Priya with 2 unread, Ananya with 0)

All photo URLs are from **Unsplash** (will break without internet).

---

### [`mockNotifications.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/data/mockNotifications.ts)

```tsx
NotificationItemData {
  id, type: 'interest'|'match'|'message'|'verification',
  profile?, title, time, isUnread, actionType?: 'accept'|'view'|'reply'
}
```

5 mock notifications covering all 4 types.

---

### [`database.types.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/types/database.types.ts) — Supabase Schema Types

```tsx
Profile        // maps to `profiles` table (snake_case fields)
MatchPreference // maps to `match_preferences` table
Interest       // maps to `interests` table (with optional sender_profile, receiver_profile)
Match          // maps to `matches` table (with optional partner_profile)
Message        // maps to `messages` table
```

**Currently unused** — all components import from `mockProfiles.ts` instead. These types are the target for when Supabase integration happens.

---

## 5. Supabase Client

### [`supabase.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/lib/supabase.ts)

**Custom storage adapter** that wraps `expo-secure-store` for native platforms and falls back to `localStorage` for web:

```tsx
const ExpoSecureStoreAdapter = {
  getItem: (key) => Platform.OS === 'web' ? localStorage.getItem(key) : SecureStore.getItemAsync(key),
  setItem: (key, val) => Platform.OS === 'web' ? localStorage.setItem(key, val) : SecureStore.setItemAsync(key, val),
  removeItem: (key) => Platform.OS === 'web' ? localStorage.removeItem(key) : SecureStore.deleteItemAsync(key),
};
```

**Client config:**
```tsx
createClient(url, anonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,  // ← important for React Native
  },
});
```

Reads `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` from env vars, with placeholder fallbacks.

**Currently not called from any screen** — only exported.

---

## 6. i18n System

### [`i18n/index.tsx`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/i18n/index.tsx)

**React Context pattern:**

```tsx
LanguageProvider
  ├── state: language ('en' | 'hi' | 'mr')
  ├── setLanguage(lang) — instant switch, no reload
  ├── t(path, fallback?) — dot-path accessor with auto English fallback
  └── currentTranslations — full translation object
```

**`t()` function logic:**
1. Split path by `.` (e.g., `'home.newMatches'` → `['home', 'newMatches']`)
2. Walk the current language's translation tree
3. If key missing → walk English tree as fallback
4. If still missing → return the path string itself or provided fallback

**Translation files:**
- [`en.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/i18n/en.ts) — 154 lines, defines `TranslationKeys` type
- [`hi.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/i18n/hi.ts) — 263 lines, full Hindi
- [`mr.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/i18n/mr.ts) — 259 lines, full Marathi

**Key namespaces:** `app`, `tabs`, `home`, `matches`, `connections`, `messages`, `profile`, `notifications`, `common`

---

## 7. Theme System

### [`theme.ts`](file:///Users/swapnilshinde/Desktop/ExpoApp/Humsafar/src/constants/theme.ts) — Single Source of Truth

```tsx
Theme = {
  colors: {
    // 30+ color tokens covering primary, secondary, tertiary, surfaces, errors, glass
    backgroundGradient: ['#ffe5d4', '#f0f7fb', '#d5f7ed'],  // THE gradient
    primary: '#ff6600',           // buttons, CTAs
    secondary: '#006b55',         // verified badges, success
    primaryContainer: '#ff6600',  // NOTE: same as primary!
    glassBackground: 'rgba(255, 255, 255, 0.55)',  // tab bar
  },
  typography: {
    // 6 size presets: headlineLg(24), headlineMd(20), bodyLg(16), bodyMd(14), labelLg(14), labelSm(12)
    fontFamily: 'Plus Jakarta Sans',  // declared but NOT loaded via expo-font
  },
  borderRadius: { sm: 4, md: 8, lg: 16, xl: 24, pill: 32, full: 9999 },
  spacing: { base: 4, xs: 8, sm: 12, md: 16, lg: 24, xl: 32 },
  shadows: {
    card: { y: 4, blur: 12, opacity: 0.05 },      // white cards
    activeBtn: { orange glow, y: 6, opacity: 0.2 }, // CTA buttons
    floatingGlass: { y: 8, blur: 16, opacity: 0.12 }, // tab bar
  },
}
```

> ⚠️ **Font not loaded**: `fontFamily: 'Plus Jakarta Sans'` is declared but `expo-font` is not used to load it. The app falls back to system fonts.

---

## 8. File Count Summary

| Category | Files | Total Lines |
|----------|-------|-------------|
| **Routes** (`app/`) | 9 files | ~1,100 lines |
| **Components** (`src/components/`) | 12 files | ~2,450 lines |
| **Data** (`src/data/`) | 2 files | ~275 lines |
| **Constants** (`src/constants/`) | 1 file | 149 lines |
| **i18n** (`src/i18n/`) | 4 files | ~555 lines |
| **Lib** (`src/lib/`) | 1 file | 47 lines |
| **Types** (`src/types/`) | 1 file | 68 lines |
| **Total** | **30 source files** | **~4,650 lines** |

---

## 9. Code Issues & Gaps

| Issue | Location | Details |
|-------|----------|---------|
| **No auth flow** | `app/index.tsx` | No login/signup screens, no session check |
| **Dual type systems** | `mockProfiles.ts` vs `database.types.ts` | `MatrimonialProfile` (camelCase) vs `Profile` (snake_case) — no mapper |
| **Font not loaded** | `theme.ts` L69 | `Plus Jakarta Sans` declared but never loaded with `expo-font` |
| **Dead component** | `ProfileCard.tsx` | 423 lines, fully built, but never rendered anywhere |
| **Hardcoded income** | `UserMatchCard.tsx` L97 | `"Earns ₹15–20 Lacs p.a"` is a string literal, not from data |
| **No action handlers** | `MatchesContent`, `ConnectionsContent` | Accept/Decline/Chat buttons are visual only — no callbacks |
| **Search not wired** | `HamsafarAppHeader.tsx` L35 | Search button renders but has no handler |
| **Supabase unused** | `supabase.ts` | Client configured but never imported by any screen |
| **All photos Unsplash** | `mockProfiles.ts` | External URLs, won't work offline |
| **Orphaned code** | `chat/[id].tsx` L41 | Empty array literal `[]` on its own line (likely leftover) |
