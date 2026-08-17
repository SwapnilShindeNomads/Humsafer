# .agents/AGENTS.md - Workspace Agent Rules & Vibrant Fintech Theme Specs

> **Expo SDK Version**: SDK 54 (expo-router 6, React 19, RN 0.81).

## Workspace Rules
1. Always follow standard React Native Expo SDK 54 conventions.
2. Store custom skills in `.agents/skills/<skill-name>/SKILL.md`.
3. Use Supabase client configured in `src/lib/supabase.ts`.
4. Maintain **Vibrant Fintech System** design aesthetics strictly using `src/constants/theme.ts`.
5. Primary CTA Color: `#ff6600` / `#a33e00`. Background: `#f4fafd`. Secondary Accent: `#006b55`.
6. **Theme Single Source of Truth**: In all screens and components, use colors strictly from `src/constants/theme.ts`. Never use direct hardcoded hex/rgba color values. If a new color is needed, add it to `src/constants/theme.ts` first and then use it.
7. **Custom Background Mandatory Rule**: EVERY screen in the application MUST use our custom background (`ScreenWrapper` component which applies the Stitch linear gradient `['#ffe5d4', '#f0f7fb', '#d5f7ed']`). Never render plain unstyled or hardcoded background screens.
8. **Centralized i18n Translation Mandatory Rule**: ALL user-facing text in screens and components MUST come from `src/i18n/` translation files (`en.ts`, `hi.ts`, `mr.ts`). Never hardcode UI display strings directly in JSX/TSX components.
9. **Tab Bar Design Finalized Rule**: The bottom tab bar (`StitchTabBar.tsx`) with floating frosted glass blur and center spinning FAB is final and must not be touched or altered.
10. **Messages Tab & Conversation Card Rule**: The Message tab must feature a search input bar, horizontal online match avatars, and a vertical list of conversations using a dedicated reusable `ConversationCard` component (`src/components/messages/ConversationCard.tsx`).
11. **ScreenWrapper Keyboard & Scroll Handling Rule**: All screens requiring keyboard avoidance or scrolling must utilize `ScreenWrapper`'s built-in `keyboardAvoiding={true}` and/or `scrollable={true}` props. Use `keyboardOffset` for screen-specific spacing. Do NOT add local ad-hoc `KeyboardAvoidingView` wrappers in individual screens.
