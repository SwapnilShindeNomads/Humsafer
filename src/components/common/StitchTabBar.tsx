import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
import { Theme } from '../../constants/theme';
import { SpinningConnectionsFab } from './SpinningConnectionsFab';
import { useTranslation } from '../../i18n';

export function StitchTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const bottomInset = insets.bottom > 0 ? insets.bottom : Platform.OS === 'ios' ? 12 : 10;

  const connectionsRouteIndex = state.routes.findIndex((r) => r.name === 'connections');
  const isConnectionsFocused = state.index === connectionsRouteIndex;

  const getTranslatedLabel = (routeName: string) => {
    switch (routeName) {
      case 'index':
        return t('tabs.home');
      case 'matches':
        return t('tabs.matches');
      case 'connections':
        return t('tabs.connections');
      case 'messages':
        return t('tabs.messages');
      case 'profile':
        return t('tabs.profile');
      default:
        return routeName;
    }
  };

  return (
    <View style={[styles.tabContainer, { paddingBottom: bottomInset }]}>
      <View style={styles.floatingWrapper}>
        {/* Floating Frosted Glass Background Layer */}
        <BlurView intensity={75} tint="light" style={styles.blurWrapper}>
          <View style={styles.tabBar}>
            {state.routes.map((route, index) => {
              const label = getTranslatedLabel(route.name);
              const isFocused = state.index === index;

              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name);
                }
              };

              const activeColor = Theme.colors.primaryContainer;
              const inactiveColor = Theme.colors.onSurfaceVariant;

              // Elevated Center "Connections" Tab Text Slot
              if (route.name === 'connections') {
                return (
                  <TouchableOpacity
                    key={route.key}
                    onPress={onPress}
                    activeOpacity={1}
                    style={styles.centerTabItem}
                  >
                    <View style={styles.fabSpacer} />
                    <Text
                      style={[
                        styles.tabLabel,
                        { color: isFocused ? activeColor : inactiveColor },
                      ]}
                    >
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              }

              // Icon Mapping: Filled when selected, Outlined when not selected
              let iconElement = null;
              if (route.name === 'index') {
                iconElement = (
                  <MaterialCommunityIcons
                    name={isFocused ? 'home' : 'home-outline'}
                    size={24}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                );
              } else if (route.name === 'matches') {
                iconElement = (
                  <MaterialCommunityIcons
                    name={isFocused ? 'heart' : 'heart-outline'}
                    size={24}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                );
              } else if (route.name === 'messages') {
                iconElement = (
                  <MaterialCommunityIcons
                    name={isFocused ? 'forum' : 'forum-outline'}
                    size={24}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                );
              } else if (route.name === 'profile') {
                iconElement = (
                  <MaterialCommunityIcons
                    name={isFocused ? 'account' : 'account-outline'}
                    size={24}
                    color={isFocused ? activeColor : inactiveColor}
                  />
                );
              }

              return (
                <TouchableOpacity
                  key={route.key}
                  onPress={onPress}
                  activeOpacity={0.7}
                  style={styles.tabItem}
                >
                  {iconElement}
                  <Text
                    style={[
                      styles.tabLabel,
                      { color: isFocused ? activeColor : inactiveColor },
                    ]}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </BlurView>

        {/* Elevated Floating Connections FAB - Layered above BlurView to prevent cropping */}
        <TouchableOpacity
          onPress={() => {
            const connectionsRoute = state.routes[connectionsRouteIndex];
            if (connectionsRoute) {
              const event = navigation.emit({
                type: 'tabPress',
                target: connectionsRoute.key,
                canPreventDefault: true,
              });
              if (!isConnectionsFocused && !event.defaultPrevented) {
                navigation.navigate(connectionsRoute.name);
              }
            }
          }}
          activeOpacity={1}
          style={styles.floatingFabOverlay}
        >
          <SpinningConnectionsFab isFocused={isConnectionsFocused} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    backgroundColor: Theme.colors.transparent,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  floatingWrapper: {
    position: 'relative',
    marginHorizontal: Theme.spacing.md,
  },
  blurWrapper: {
    borderRadius: Theme.borderRadius.pill,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    backgroundColor: Theme.colors.glassBackground,
    shadowColor: Theme.shadows.floatingGlass.shadowColor,
    shadowOffset: Theme.shadows.floatingGlass.shadowOffset,
    shadowOpacity: Theme.shadows.floatingGlass.shadowOpacity,
    shadowRadius: Theme.shadows.floatingGlass.shadowRadius,
    elevation: Theme.shadows.floatingGlass.elevation,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 6,
    paddingBottom: 6,
    height: Platform.OS === 'ios' ? 62 : 58,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fabSpacer: {
    height: 26,
  },
  floatingFabOverlay: {
    position: 'absolute',
    top: -16,
    left: '50%',
    marginLeft: -25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    elevation: 10,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
});
