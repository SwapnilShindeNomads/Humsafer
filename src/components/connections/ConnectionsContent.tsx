import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '../common/ScreenWrapper';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import { MOCK_INTERESTS } from '../../data/mockProfiles';

export function ConnectionsContent() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'accepted'>('received');

  const filteredList = MOCK_INTERESTS.filter((item) => {
    if (activeTab === 'accepted') return item.status === 'accepted';
    if (activeTab === 'sent') return item.type === 'sent';
    return item.type === 'received' && item.status === 'pending';
  });

  return (
    <ScreenWrapper showAppHeader>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Segmented Control */}
        <View style={styles.segmentContainer}>
          {(['received', 'sent', 'accepted'] as const).map((tabKey) => {
            const isSelected = activeTab === tabKey;
            return (
              <TouchableOpacity
                key={tabKey}
                style={[styles.segmentBtn, isSelected && styles.segmentBtnActive]}
                onPress={() => setActiveTab(tabKey)}
                activeOpacity={0.8}
              >
                <Text style={[styles.segmentText, isSelected && styles.segmentTextActive]}>
                  {t(`connections.tabs.${tabKey}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filteredList.length > 0 ? (
          filteredList.map((item) => (
            <View key={item.id} style={styles.itemCard}>
              <Image source={{ uri: item.profile.photoUrls[0] }} style={styles.avatar} />
              <View style={styles.info}>
                <Text style={styles.name}>{item.profile.fullName}, {item.profile.age}</Text>
                <Text style={styles.detail}>{item.profile.profession} • {item.profile.city}</Text>
                {item.message ? <Text numberOfLines={1} style={styles.msg}>"{item.message}"</Text> : null}
              </View>

              {activeTab === 'received' && (
                <View style={styles.actionCol}>
                  <TouchableOpacity style={styles.acceptBtn} activeOpacity={0.8}>
                    <Text style={styles.acceptBtnText}>{t('connections.actions.accept')}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.declineBtn} activeOpacity={0.8}>
                    <Text style={styles.declineBtnText}>{t('connections.actions.decline')}</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('connections.emptyState')}</Text>
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: { padding: Theme.spacing.md, paddingBottom: 100 },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderRadius: Theme.borderRadius.pill,
    padding: 4,
    marginBottom: Theme.spacing.md,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: Theme.borderRadius.pill,
  },
  segmentBtnActive: {
    backgroundColor: Theme.colors.primaryContainer,
  },
  segmentText: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
    color: Theme.colors.onSurfaceVariant,
  },
  segmentTextActive: {
    color: Theme.colors.white,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: Theme.spacing.md },
  info: { flex: 1 },
  name: { fontSize: Theme.typography.headlineMd.fontSize, fontWeight: '700', color: Theme.colors.onSurface },
  detail: { fontSize: Theme.typography.labelSm.fontSize, color: Theme.colors.onSurfaceVariant, marginTop: 2 },
  msg: { fontSize: Theme.typography.labelSm.fontSize, fontStyle: 'italic', color: Theme.colors.tertiary, marginTop: 4 },
  actionCol: { gap: 6 },
  acceptBtn: {
    backgroundColor: Theme.colors.secondary,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.md,
  },
  acceptBtnText: { color: Theme.colors.white, fontWeight: '600', fontSize: 12 },
  declineBtn: {
    backgroundColor: Theme.colors.surfaceContainerHigh,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.md,
  },
  declineBtnText: { color: Theme.colors.onSurfaceVariant, fontWeight: '600', fontSize: 12 },
  emptyContainer: { padding: Theme.spacing.xl, alignItems: 'center' },
  emptyText: { fontSize: Theme.typography.bodyMd.fontSize, color: Theme.colors.onSurfaceVariant },
});
