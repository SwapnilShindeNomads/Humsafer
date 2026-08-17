import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '../common/ScreenWrapper';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import {
  MOCK_PROFILES,
  CURRENT_USER_PROFILE,
} from '../../data/mockProfiles';
import { NewMatchAvatarCard } from './NewMatchAvatarCard';
import { UserMatchCard } from './UserMatchCard';

export function HomeContent() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper showAppHeader>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* SECTION 1: NEW MATCHES (Horizontal Scrolling List) */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>{t('home.newMatches')}</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAllText}>{t('home.seeAll')}</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalListContainer}
          >
            {MOCK_PROFILES.map((profile) => (
              <NewMatchAvatarCard
                key={`new_${profile.id}`}
                profile={profile}
              />
            ))}
          </ScrollView>
        </View>

        {/* SECTION 2: TOP MATCHES (Vertical Feed of Full-Bleed User Match Cards) */}
        <View style={styles.sectionWrapper}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>{t('home.topMatches')}</Text>
            <TouchableOpacity style={styles.filterTuneBtn} activeOpacity={0.7}>
              <MaterialIcons name="tune" size={20} color={Theme.colors.onSurface} />
            </TouchableOpacity>
          </View>

          <View style={styles.verticalFeedContainer}>
            {MOCK_PROFILES.map((profile) => (
              <UserMatchCard
                key={`top_${profile.id}`}
                profile={profile}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.xs,
    paddingBottom: 110, // Safe clearance for floating StitchTabBar
  },
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarHeader: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: Theme.colors.primaryContainer,
  },
  appNameContainer: {
    marginLeft: Theme.spacing.sm,
  },
  appNameText: {
    fontSize: Theme.typography.headlineMd.fontSize,
    fontWeight: '800',
    color: Theme.colors.primaryContainer,
    letterSpacing: 0.3,
  },
  appTagline: {
    fontSize: 11,
    color: Theme.colors.onSurfaceVariant,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: Theme.borderRadius.pill,
    backgroundColor: Theme.colors.glassBackground,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Theme.colors.primaryContainer,
  },
  sectionWrapper: {
    marginBottom: Theme.spacing.lg,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Theme.spacing.sm,
  },
  sectionTitle: {
    fontSize: Theme.typography.headlineMd.fontSize - 2,
    fontWeight: '700',
    color: Theme.colors.onSurface,
  },
  seeAllText: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  filterTuneBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  horizontalListContainer: {
    paddingVertical: Theme.spacing.xs,
  },
  verticalFeedContainer: {
    marginTop: Theme.spacing.xs,
  },
});
