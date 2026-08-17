import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import { NotificationItemData } from '../../data/mockNotifications';

export interface NotificationItemCardProps {
  item: NotificationItemData;
  onPress?: () => void;
  onActionPress?: () => void;
}

export function NotificationItemCard({
  item,
  onPress,
  onActionPress,
}: NotificationItemCardProps) {
  const { t } = useTranslation();

  const renderBadgeIcon = () => {
    switch (item.type) {
      case 'interest':
        return (
          <View style={[styles.badgeIconWrapper, { backgroundColor: Theme.colors.primaryContainer }]}>
            <MaterialIcons name="favorite" size={10} color={Theme.colors.white} />
          </View>
        );
      case 'match':
        return (
          <View style={[styles.badgeIconWrapper, { backgroundColor: Theme.colors.secondary }]}>
            <Ionicons name="sparkles" size={10} color={Theme.colors.white} />
          </View>
        );
      case 'message':
        return (
          <View style={[styles.badgeIconWrapper, { backgroundColor: '#3b82f6' }]}>
            <MaterialIcons name="chat-bubble" size={10} color={Theme.colors.white} />
          </View>
        );
      default:
        return (
          <View style={[styles.badgeIconWrapper, { backgroundColor: Theme.colors.secondary }]}>
            <MaterialIcons name="verified" size={10} color={Theme.colors.white} />
          </View>
        );
    }
  };

  const getNotificationText = () => {
    if (item.profile) {
      const name = item.profile.fullName;
      const typeText = t(`notifications.types.${item.type}`);
      return `${name} ${typeText}`;
    }
    return item.title;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.cardContainer,
        item.isUnread && styles.cardContainerUnread,
      ]}
    >
      {/* Avatar / System Icon */}
      <View style={styles.avatarWrapper}>
        {item.profile ? (
          <Image
            source={{ uri: item.profile.photoUrls[0] }}
            style={styles.avatarImage}
          />
        ) : (
          <View style={styles.systemIconBg}>
            <MaterialIcons name="security" size={24} color={Theme.colors.secondary} />
          </View>
        )}
        {renderBadgeIcon()}
      </View>

      {/* Main Notification Content */}
      <View style={styles.contentCol}>
        <Text numberOfLines={2} style={styles.notificationText}>
          {getNotificationText()}
        </Text>
        <Text style={styles.timeText}>{item.time}</Text>

        {/* Action Button if available */}
        {item.actionType && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionBtn}
              activeOpacity={0.8}
              onPress={onActionPress}
            >
              <Text style={styles.actionBtnText}>
                {t(`notifications.actions.${item.actionType}`)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Unread Status Dot */}
      {item.isUnread && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
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
    position: 'relative',
  },
  cardContainerUnread: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primaryContainer,
  },
  avatarWrapper: {
    width: 48,
    height: 48,
    position: 'relative',
    marginRight: Theme.spacing.md,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  systemIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Theme.colors.surfaceContainerLow,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeIconWrapper: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.white,
  },
  contentCol: {
    flex: 1,
  },
  notificationText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurface,
    lineHeight: 19,
    fontWeight: '500',
  },
  timeText: {
    fontSize: Theme.typography.labelSm.fontSize,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 3,
  },
  actionRow: {
    marginTop: 8,
    flexDirection: 'row',
  },
  actionBtn: {
    backgroundColor: Theme.colors.primaryContainer,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: Theme.borderRadius.pill,
  },
  actionBtnText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Theme.colors.primaryContainer,
    marginLeft: Theme.spacing.xs,
  },
});
