import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import { CURRENT_USER_PROFILE } from '../../data/mockProfiles';

export function HamsafarAppHeader() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={styles.headerContainer}>
      {/* Left: User Avatar & App Title */}
      <View style={styles.headerLeft}>
        <Image
          source={{ uri: CURRENT_USER_PROFILE.photoUrls[0] }}
          style={styles.userAvatar}
        />
        <View style={styles.titleWrapper}>
          <Text style={styles.appNameText}>{t('app.name')}</Text>
          <Text style={styles.appTagline}>{t('app.tagline')}</Text>
        </View>
      </View>

      {/* Right: Search & Bell Buttons */}
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.circularIconBtn} activeOpacity={0.75}>
          <MaterialIcons
            name="search"
            size={22}
            color={Theme.colors.onSurface}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.circularIconBtn}
          activeOpacity={0.75}
          onPress={() => router.push('/notifications')}
        >
          <MaterialIcons
            name="notifications-none"
            size={22}
            color={Theme.colors.onSurface}
          />
          <View style={styles.notificationDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.colors.transparent,
    zIndex: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: Theme.colors.primaryContainer,
  },
  titleWrapper: {
    marginLeft: Theme.spacing.sm,
  },
  appNameText: {
    fontSize: Theme.typography.headlineMd.fontSize + 1,
    fontWeight: '800',
    color: Theme.colors.primaryContainer,
    letterSpacing: 0.2,
    lineHeight: 24,
  },
  appTagline: {
    fontSize: 12,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 0,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  circularIconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primaryContainer,
  },
});
