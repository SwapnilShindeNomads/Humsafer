import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ScreenWrapper } from '../common/ScreenWrapper';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import {
  MOCK_NOTIFICATIONS,
  NotificationItemData,
} from '../../data/mockNotifications';
import { NotificationItemCard } from './NotificationItemCard';

export function NotificationsContent() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'all' | 'interests' | 'matches' | 'system'>('all');
  const [notificationsList, setNotificationsList] = useState<NotificationItemData[]>(MOCK_NOTIFICATIONS);

  const handleMarkAllRead = () => {
    setNotificationsList((prev) =>
      prev.map((n) => ({ ...n, isUnread: false }))
    );
  };

  const filteredNotifications = notificationsList.filter((n) => {
    if (activeTab === 'interests') return n.type === 'interest';
    if (activeTab === 'matches') return n.type === 'match';
    if (activeTab === 'system') return n.type === 'verification';
    return true;
  });

  const hasUnread = notificationsList.some((n) => n.isUnread);

  return (
    <ScreenWrapper
      showHeader
      title={t('notifications.title')}
      showBackButton
      rightAction={
        hasUnread ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleMarkAllRead}>
            <Text style={styles.markReadText}>{t('notifications.markAllRead')}</Text>
          </TouchableOpacity>
        ) : null
      }
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Category Tabs / Filters */}
        <View style={styles.tabsRow}>
          {(['all', 'interests', 'matches', 'system'] as const).map((tabKey) => {
            const isSelected = activeTab === tabKey;
            return (
              <TouchableOpacity
                key={tabKey}
                activeOpacity={0.8}
                onPress={() => setActiveTab(tabKey)}
                style={[
                  styles.tabChip,
                  isSelected && styles.tabChipActive,
                ]}
              >
                <Text
                  style={[
                    styles.tabChipText,
                    isSelected && styles.tabChipTextActive,
                  ]}
                >
                  {t(`notifications.tabs.${tabKey}`)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Notifications Feed */}
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((item) => (
            <NotificationItemCard
              key={item.id}
              item={item}
              onPress={() => {
                // Mark item as read on tap
                setNotificationsList((prev) =>
                  prev.map((n) => (n.id === item.id ? { ...n, isUnread: false } : n))
                );
              }}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{t('notifications.emptyState')}</Text>
          </View>
        )}
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
    paddingBottom: 40,
  },
  markReadText: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
    color: Theme.colors.primary,
  },
  tabsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: Theme.spacing.md,
  },
  tabChip: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Theme.borderRadius.pill,
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
  },
  tabChipActive: {
    backgroundColor: Theme.colors.primaryContainer,
    borderColor: Theme.colors.primaryContainer,
  },
  tabChipText: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
    color: Theme.colors.onSurfaceVariant,
  },
  tabChipTextActive: {
    color: Theme.colors.white,
  },
  emptyContainer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: Theme.typography.bodyLg.fontSize,
    color: Theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
