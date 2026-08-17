import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '../common/ScreenWrapper';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import { MOCK_PROFILES } from '../../data/mockProfiles';

export function MatchesContent() {
  const { t } = useTranslation();

  return (
    <ScreenWrapper showAppHeader>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.subtitle}>{t('matches.subtitle')}</Text>

        {MOCK_PROFILES.slice(0, 2).map((profile) => (
          <View key={profile.id} style={styles.matchCard}>
            <Image source={{ uri: profile.photoUrls[0] }} style={styles.avatar} />
            <View style={styles.info}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{profile.fullName}, {profile.age}</Text>
                {profile.isVerified && (
                  <MaterialIcons name="verified" size={16} color={Theme.colors.secondary} style={{ marginLeft: 4 }} />
                )}
              </View>
              <Text style={styles.profession}>{profile.profession}</Text>
              <Text style={styles.location}>{profile.city}, {profile.state}</Text>
            </View>
            <TouchableOpacity style={styles.chatBtn} activeOpacity={0.8}>
              <MaterialIcons name="chat-bubble" size={16} color={Theme.colors.white} />
              <Text style={styles.chatBtnText}>{t('matches.chatNow')}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: Theme.spacing.md, paddingBottom: 100 },
  subtitle: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurfaceVariant,
    marginBottom: Theme.spacing.md,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  avatar: { width: 56, height: 56, borderRadius: 28, marginRight: Theme.spacing.md },
  info: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center' },
  name: { fontSize: Theme.typography.headlineMd.fontSize, fontWeight: '700', color: Theme.colors.onSurface },
  profession: { fontSize: Theme.typography.bodyMd.fontSize, color: Theme.colors.primary, marginTop: 2 },
  location: { fontSize: Theme.typography.labelSm.fontSize, color: Theme.colors.onSurfaceVariant, marginTop: 2 },
  chatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primaryContainer,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.pill,
    gap: 4,
  },
  chatBtnText: { color: Theme.colors.white, fontWeight: '600', fontSize: Theme.typography.labelSm.fontSize },
});
