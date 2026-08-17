import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { ScreenWrapper } from '../common/ScreenWrapper';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import {
  MOCK_CONVERSATIONS,
  MOCK_PROFILES,
  MessageConversation,
} from '../../data/mockProfiles';
import { ConversationCard } from './ConversationCard';

export function MessagesContent() {
  const router = useRouter();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations] = useState<MessageConversation[]>(MOCK_CONVERSATIONS);

  const filteredConversations = conversations.filter((conv) =>
    conv.profile.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScreenWrapper showAppHeader>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Search Input Bar */}
        <View style={styles.searchBarWrapper}>
          <MaterialIcons
            name="search"
            size={20}
            color={Theme.colors.onSurfaceVariant}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder={t('messages.searchPlaceholder')}
            placeholderTextColor={Theme.colors.onSurfaceVariant}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialIcons
                name="close"
                size={18}
                color={Theme.colors.onSurfaceVariant}
              />
            </TouchableOpacity>
          )}
        </View>

        {/* Section 1: Recent Matches / Active Connections (Horizontal Avatars Row) */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>{t('matches.title')}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalAvatarRow}
          >
            {MOCK_PROFILES.map((profile) => (
              <TouchableOpacity
                key={`msg_avatar_${profile.id}`}
                activeOpacity={0.85}
                style={styles.storyItem}
                onPress={() => router.push(`/chat/${profile.id}`)}
              >
                <View style={styles.storyAvatarWrapper}>
                  <Image
                    source={{ uri: profile.photoUrls[0] }}
                    style={styles.storyAvatar}
                  />
                  <View style={styles.onlineBadgeDot} />
                </View>
                <Text numberOfLines={1} style={styles.storyNameText}>
                  {profile.fullName.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Section 2: Recent Conversations List */}
        <View style={styles.sectionWrapper}>
          <Text style={styles.sectionTitle}>{t('messages.title')}</Text>

          {filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <ConversationCard
                key={conv.id}
                conversation={conv}
                onPress={() => router.push(`/chat/${conv.profile.id}`)}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <MaterialIcons
                name="forum"
                size={40}
                color={Theme.colors.onSurfaceVariant}
              />
              <Text style={styles.emptyText}>{t('messages.noMessages')}</Text>
            </View>
          )}
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
  searchBarWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.pill,
    paddingHorizontal: Theme.spacing.md,
    height: 44,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurface,
  },
  sectionWrapper: {
    marginBottom: Theme.spacing.md,
  },
  sectionTitle: {
    fontSize: Theme.typography.headlineMd.fontSize - 3,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    marginBottom: Theme.spacing.xs,
  },
  horizontalAvatarRow: {
    paddingVertical: Theme.spacing.xs,
    gap: 14,
  },
  storyItem: {
    alignItems: 'center',
    width: 60,
  },
  storyAvatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: Theme.colors.primaryContainer,
    padding: 2,
    position: 'relative',
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 26,
  },
  onlineBadgeDot: {
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
  storyNameText: {
    fontSize: Theme.typography.labelSm.fontSize - 1,
    fontWeight: '600',
    color: Theme.colors.onSurface,
    marginTop: 4,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: Theme.spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurfaceVariant,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
  },
});
