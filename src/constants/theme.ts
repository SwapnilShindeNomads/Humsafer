export const Theme = {
  colors: {
    // Pure & Utility Colors
    white: '#ffffff',
    black: '#000000',
    transparent: 'transparent',

    // Glassmorphism Floating Tab Tokens
    glassBackground: 'rgba(255, 255, 255, 0.55)',
    glassBorder: 'rgba(255, 255, 255, 0.7)',

    // Faint Stitch Gradient Tokens (Top-Left Saffron Orange to Bottom-Right Mint Green)
    backgroundGradient: ['#ffe5d4', '#f0f7fb', '#d5f7ed'],

    // Primary International Orange Palette
    primary: '#ff6600', // Primary active Orange
    primaryDark: '#a33e00',
    onPrimary: '#ffffff',
    primaryContainer: '#ff6600',
    onPrimaryContainer: '#561d00',
    inversePrimary: '#ffb596',

    // Secondary Mint Green Palette
    secondary: '#006b55',
    onSecondary: '#ffffff',
    secondaryContainer: '#6dfad2',
    onSecondaryContainer: '#00725b',

    // Tertiary Warm Earth Palette
    tertiary: '#655d4f',
    onTertiary: '#ffffff',
    tertiaryContainer: '#9f9685',
    onTertiaryContainer: '#352f22',

    // Background & Surfaces
    background: '#f4fafd',
    onBackground: '#161d1f',
    surface: '#f4fafd',
    surfaceDim: '#d4dbdd',
    surfaceBright: '#f4fafd',
    surfaceContainerLowest: '#ffffff',
    surfaceContainerLow: '#eef5f7',
    surfaceContainer: '#e8eff1',
    surfaceContainerHigh: '#e2e9ec',
    surfaceContainerHighest: '#dde4e6',
    onSurface: '#161d1f',
    onSurfaceVariant: '#5a4136',
    surfaceVariant: '#dde4e6',
    surfaceTint: '#a33e00',

    // Outlines & Borders
    outline: '#8e7164',
    outlineVariant: '#e3bfb1',

    // Errors
    error: '#ba1a1a',
    onError: '#ffffff',
    errorContainer: '#ffdad6',
    onErrorContainer: '#93000a',

    // Functional Helpers for Badges & Buttons
    verified: '#006b55', // Mint green success/verified
    heart: '#ff6600',
    fabIcon: '#ffffff',
    shadowColor: '#000000',
  },

  typography: {
    fontFamily: 'Plus Jakarta Sans',
    headlineLg: {
      fontSize: 24,
      fontWeight: '700' as const,
      lineHeight: 32,
    },
    headlineMd: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    bodyLg: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodyMd: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    labelLg: {
      fontSize: 14,
      fontWeight: '600' as const,
      lineHeight: 16,
    },
    labelSm: {
      fontSize: 12,
      fontWeight: '500' as const,
      lineHeight: 14,
    },
  },

  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    pill: 32,
    full: 9999,
  },

  spacing: {
    base: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32,
    marginMobile: 16,
    marginDesktop: 40,
  },

  shadows: {
    // Level 1: Pure white cards floating over soft background (y: 4, blur: 12, opacity: 0.05)
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.05,
      shadowRadius: 12,
      elevation: 2,
    },
    // Level 2: Active elements floating action button
    activeBtn: {
      shadowColor: '#ff6600',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 12,
      elevation: 4,
    },
    // Level 3: Glassmorphism floating tab bar shadow
    floatingGlass: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 10,
    },
  },
};
