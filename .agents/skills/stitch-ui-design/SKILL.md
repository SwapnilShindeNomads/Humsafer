---
name: Vibrant Fintech System
description: Design system, UI generation guidelines, color palettes, visual components, and Stitch integration workflows for the Hamsafar app.
---

# Stitch UI Design - Vibrant Fintech System Skill

- **Stitch Project Link**: [https://stitch.withgoogle.com/u/1/projects/7506002916552087860](https://stitch.withgoogle.com/u/1/projects/7506002916552087860)
- **Stitch Project ID**: `7506002916552087860`

## 1. Exact Design Tokens

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
  glass-background: 'rgba(255, 255, 255, 0.55)'
  glass-border: 'rgba(255, 255, 255, 0.7)'
  background-gradient: ['#ffe5d4', '#f0f7fb', '#d5f7ed']
typography:
  fontFamily: Plus Jakarta Sans
  headline-lg: 24px (fontWeight: '700', lineHeight: 32px)
  headline-md: 20px (fontWeight: '600', lineHeight: 28px)
  body-lg: 16px (fontWeight: '400', lineHeight: 24px)
  body-md: 14px (fontWeight: '400', lineHeight: 20px)
  label-lg: 14px (fontWeight: '600', lineHeight: 16px)
  label-sm: 12px (medium / 500)
rounded:
  sm: 4px
  md: 8px
  lg: 16px
  xl: 24px
  pill: 32px
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  margin-mobile: 16px
  margin-desktop: 40px
```

## 2. Key Components & Architecture Specs

### Single Source of Truth Theme
In all screens and components, use colors strictly from `src/constants/theme.ts`. Never use hardcoded hex/rgba strings directly in component files. If a required color or token is missing, add it to `src/constants/theme.ts` first and then consume it in the UI.

### Floating Glassmorphic Bottom Navigation Bar (`src/components/common/StitchTabBar.tsx`)
- **Blur Translucency**: Native `BlurView` (`intensity={75}`, `tint="light"`, `glassBackground: 'rgba(255, 255, 255, 0.55)'`).
- **Elevated Connections FAB**: Circular orange FAB button with `PeopleAltIcon` (`MaterialIcons` `people-alt`), `activeOpacity={1}` (no black touch opacity/tint), and a smooth rotating **White $\rightarrow$ Orange $\rightarrow$ White $\rightarrow$ Green** tricolor ring when selected.
- **Uncropped Overlay**: FAB layer (`zIndex: 10`) positioned over `BlurView` so `overflow: 'hidden'` never crops the top of the FAB button.
- **Universal Safe Insets**: `useSafeAreaInsets()` for dynamic spacing across all iOS and Android screens.

### Reusable ScreenWrapper (`src/components/common/ScreenWrapper.tsx`)
- **Mandatory Custom Background**: EVERY screen in the application MUST wrap its root view in `<ScreenWrapper>`, which renders the signature Stitch Gradient Background (`LinearGradient` starting top-left `#ffe5d4` Saffron Orange $\rightarrow$ middle `#f0f7fb` $\rightarrow$ bottom-right `#d5f7ed` Mint Green) defined in `Theme.colors.backgroundGradient`.
- **Pure White Override Option**: Passing `bgWhite={true}` seamlessly overrides background to pure `#ffffff` when needed for specific card or modal sub-views.
- **Configurable Custom Header**: Options for `showHeader`, `title`, `showBackButton`, `onBackPress`, and `rightAction`.
- **Unified Keyboard & Scroll Handling**: Built-in `keyboardAvoiding={true}` (enabled by default) and `scrollable={true}` props. Supports `keyboardOffset` for screen-specific spacing above the keyboard without ad-hoc local wrapper boilerplates. On Android, keyboard dismiss strictly resets bottom padding to `0` to prevent leftover whitespace gaps.

## 3. Centralized Localization & Translation System (`src/i18n/`)
- **Mandatory String Externalization**: NO hardcoded display strings in screen or component files. All strings are stored in `src/i18n/`.
- **Supported LTR Languages**:
  - `en.ts` — English (Default)
  - `hi.ts` — Hindi (हिन्दी)
  - `mr.ts` — Marathi (मराठी)
- **Usage via Translation Hook**: Components use `useTranslation()` context hook to retrieve localized strings, e.g. `const { t, language, changeLanguage } = useTranslation();`.

## 4. Messages Tab UI & Conversation Card Component (`src/components/messages/`)
- **Sticky App Header**: Uses `<ScreenWrapper showAppHeader>` for fixed top branding.
- **Search Bar**: Full width rounded search input with `MaterialIcons` `search`.
- **Recent Matches Row**: Horizontal scrolling avatars with green online status dots.
- **Reusable `ConversationCard`**: Standalone component (`src/components/messages/ConversationCard.tsx`) rendering avatar, online badge, candidate name, unread count pill, timestamp, and message snippet.
