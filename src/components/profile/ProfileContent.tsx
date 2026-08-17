import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '../common/ScreenWrapper';
import { Theme } from '../../constants/theme';
import { useTranslation, Language, LANGUAGE_NAMES } from '../../i18n';
import { CURRENT_USER_PROFILE } from '../../data/mockProfiles';

export function ProfileContent() {
  const router = useRouter();
  const { t, language, setLanguage } = useTranslation();

  const languagesList: Language[] = ['en', 'hi', 'mr'];

  return (
    <ScreenWrapper showAppHeader>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* User Brief Card Header */}
        <View style={styles.userCard}>
          <Image
            source={{ uri: CURRENT_USER_PROFILE.photoUrls[0] }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.userName}>{CURRENT_USER_PROFILE.fullName}</Text>
              {CURRENT_USER_PROFILE.isVerified && (
                <MaterialIcons
                  name="verified"
                  size={18}
                  color={Theme.colors.secondary}
                  style={styles.verifiedIcon}
                />
              )}
            </View>
            <Text style={styles.userProfession}>{CURRENT_USER_PROFILE.profession}</Text>
            <Text style={styles.userLocation}>
              {CURRENT_USER_PROFILE.city}, {CURRENT_USER_PROFILE.state}
            </Text>
          </View>
        </View>

        {/* SECTION 1: User Profile Update Option */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>{t('profile.userProfileUpdate')}</Text>
          <TouchableOpacity
            style={styles.actionCard}
            activeOpacity={0.8}
            onPress={() => router.push('/profile/edit')}
          >
            <View style={styles.actionIconWrapper}>
              <MaterialIcons name="person-outline" size={24} color={Theme.colors.primary} />
            </View>
            <View style={styles.actionTextWrapper}>
              <Text style={styles.actionTitle}>{t('profile.userProfileUpdate')}</Text>
              <Text style={styles.actionSubtitle}>{t('profile.edit')}</Text>
            </View>
            <MaterialIcons
              name="chevron-right"
              size={24}
              color={Theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>
        </View>

        {/* SECTION 2: Settings & Language Change Option */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionHeader}>{t('profile.settings')}</Text>
          <View style={styles.settingsCard}>
            <View style={styles.settingRowHeader}>
              <View style={styles.actionIconWrapper}>
                <MaterialIcons name="language" size={24} color={Theme.colors.primary} />
              </View>
              <Text style={styles.actionTitle}>{t('profile.languageSelect')}</Text>
            </View>

            {/* Language Selection Pills */}
            <View style={styles.languagePillsContainer}>
              {languagesList.map((langKey) => {
                const isSelected = language === langKey;
                const langObj = LANGUAGE_NAMES[langKey];
                return (
                  <TouchableOpacity
                    key={langKey}
                    activeOpacity={0.7}
                    onPress={() => setLanguage(langKey)}
                    style={[
                      styles.langPill,
                      isSelected && styles.langPillActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.langPillText,
                        isSelected && styles.langPillTextActive,
                      ]}
                    >
                      {langObj.nativeName}
                    </Text>
                    {isSelected && (
                      <MaterialIcons
                        name="check-circle"
                        size={16}
                        color={Theme.colors.white}
                        style={{ marginLeft: 4 }}
                      />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
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
    padding: Theme.spacing.md,
    paddingBottom: 100, // Safe clearance for floating tab bar
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.lg,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: Theme.spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: Theme.typography.headlineMd.fontSize,
    fontWeight: Theme.typography.headlineMd.fontWeight,
    color: Theme.colors.onSurface,
  },
  verifiedIcon: {
    marginLeft: 6,
  },
  userProfession: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  userLocation: {
    fontSize: Theme.typography.labelSm.fontSize,
    color: Theme.colors.tertiary,
    marginTop: 2,
  },
  sectionContainer: {
    marginBottom: Theme.spacing.lg,
  },
  sectionHeader: {
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: Theme.typography.labelLg.fontWeight,
    color: Theme.colors.onSurfaceVariant,
    marginBottom: Theme.spacing.xs,
    marginLeft: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  actionIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Theme.spacing.md,
  },
  actionTextWrapper: {
    flex: 1,
  },
  actionTitle: {
    fontSize: Theme.typography.bodyLg.fontSize,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  actionSubtitle: {
    fontSize: Theme.typography.labelSm.fontSize,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  settingsCard: {
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  settingRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  languagePillsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  langPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
  },
  langPillActive: {
    backgroundColor: Theme.colors.primaryContainer,
    borderColor: Theme.colors.primaryContainer,
  },
  langPillText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    fontWeight: '600',
    color: Theme.colors.onSurface,
  },
  langPillTextActive: {
    color: Theme.colors.onPrimary,
  },
});
