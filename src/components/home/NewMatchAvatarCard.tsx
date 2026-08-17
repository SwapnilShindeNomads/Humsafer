import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Theme } from '../../constants/theme';
import { MatrimonialProfile } from '../../data/mockProfiles';

export interface NewMatchAvatarCardProps {
  profile: MatrimonialProfile;
  onPress?: () => void;
}

export function NewMatchAvatarCard({ profile, onPress }: NewMatchAvatarCardProps) {
  const firstName = profile.fullName.split(' ')[0];

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.cardWrapper}
    >
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: profile.photoUrls[0] }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
        {profile.isVerified && (
          <View style={styles.verifiedTag}>
            <MaterialIcons name="verified" size={12} color={Theme.colors.white} />
          </View>
        )}
      </View>

      <Text numberOfLines={1} style={styles.nameText}>
        {firstName}, {profile.age}
      </Text>
      <Text numberOfLines={1} style={styles.professionText}>
        {profile.profession}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: 96,
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: Theme.colors.primaryContainer,
    padding: 2,
    position: 'relative',
    backgroundColor: Theme.colors.surfaceContainerLow,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
  },
  verifiedTag: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: Theme.colors.secondary,
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: Theme.colors.white,
  },
  nameText: {
    fontSize: Theme.typography.labelLg.fontSize - 1,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    marginTop: 6,
    textAlign: 'center',
  },
  professionText: {
    fontSize: 11,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 1,
    textAlign: 'center',
  },
});
