import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../../constants/theme';
import { MessageConversation } from '../../data/mockProfiles';

export interface ConversationCardProps {
  conversation: MessageConversation;
  onPress?: () => void;
}

export function ConversationCard({
  conversation,
  onPress,
}: ConversationCardProps) {
  const { profile, lastMessage, timestamp, unreadCount } = conversation;
  const isUnread = unreadCount > 0;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[
        styles.cardContainer,
        isUnread && styles.cardContainerUnread,
      ]}
    >
      {/* Profile Avatar Thumbnail with Online Badge */}
      <View style={styles.avatarWrapper}>
        <Image
          source={{ uri: profile.photoUrls[0] }}
          style={styles.avatarImage}
        />
        <View style={styles.onlineDot} />
      </View>

      {/* Details Column */}
      <View style={styles.infoCol}>
        <View style={styles.topRow}>
          <Text numberOfLines={1} style={styles.nameText}>
            {profile.fullName}
          </Text>
          <Text style={[styles.timeText, isUnread && styles.timeTextUnread]}>
            {timestamp}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            numberOfLines={1}
            style={[
              styles.lastMessageText,
              isUnread && styles.lastMessageTextUnread,
            ]}
          >
            {lastMessage}
          </Text>

          {isUnread && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadBadgeText}>{unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
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
  },
  cardContainerUnread: {
    backgroundColor: Theme.colors.white,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primaryContainer,
  },
  avatarWrapper: {
    width: 52,
    height: 52,
    position: 'relative',
    marginRight: Theme.spacing.md,
  },
  avatarImage: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Theme.colors.surfaceContainerLow,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Theme.colors.secondary,
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  infoCol: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameText: {
    fontSize: Theme.typography.headlineMd.fontSize - 2,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    flex: 1,
    marginRight: 8,
  },
  timeText: {
    fontSize: Theme.typography.labelSm.fontSize,
    color: Theme.colors.onSurfaceVariant,
  },
  timeTextUnread: {
    color: Theme.colors.primaryContainer,
    fontWeight: '600',
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessageText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurfaceVariant,
    flex: 1,
    marginRight: 8,
  },
  lastMessageTextUnread: {
    color: Theme.colors.onSurface,
    fontWeight: '600',
  },
  unreadBadge: {
    backgroundColor: Theme.colors.primaryContainer,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  unreadBadgeText: {
    color: Theme.colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
});
