import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import { MatrimonialProfile } from '../../data/mockProfiles';

const { width } = Dimensions.get('window');

export interface ProfileCardProps {
  profile: MatrimonialProfile;
  onPass: () => void;
  onConnect: () => void;
  onSuperLike: () => void;
  onPressProfile?: () => void;
}

export function ProfileCard({
  profile,
  onPass,
  onConnect,
  onSuperLike,
  onPressProfile,
}: ProfileCardProps) {
  const { t } = useTranslation();
  const [photoIndex, setPhotoIndex] = useState(0);

  const currentPhoto = profile.photoUrls[photoIndex] || profile.photoUrls[0];

  const handleNextPhoto = () => {
    if (profile.photoUrls.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % profile.photoUrls.length);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPressProfile}
        style={styles.cardContent}
      >
        {/* Photo Container */}
        <View style={styles.photoWrapper}>
          <Image
            source={{ uri: currentPhoto }}
            style={styles.profileImage}
            resizeMode="cover"
          />

          {/* Photo Navigation Overlay (Clickable right side for next photo) */}
          {profile.photoUrls.length > 1 && (
            <TouchableOpacity
              style={styles.photoOverlayTouch}
              onPress={handleNextPhoto}
              activeOpacity={1}
            />
          )}

          {/* Top Pagination Dots */}
          {profile.photoUrls.length > 1 && (
            <View style={styles.paginationRow}>
              {profile.photoUrls.map((_, idx) => (
                <View
                  key={idx}
                  style={[
                    styles.paginationDot,
                    idx === photoIndex && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          )}

          {/* Top Badges Overlay */}
          <View style={styles.topBadgesRow}>
            {profile.isVerified ? (
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={14} color={Theme.colors.white} />
                <Text style={styles.verifiedBadgeText}>{t('home.verified')}</Text>
              </View>
            ) : (
              <View />
            )}

            <View style={styles.matchScoreBadge}>
              <MaterialCommunityIcons
                name="heart-flash"
                size={14}
                color={Theme.colors.white}
              />
              <Text style={styles.matchScoreText}>
                {profile.matchScore}% {t('home.matchScore')}
              </Text>
            </View>
          </View>

          {/* Bottom Gradient overlay on photo */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={styles.imageBottomGradient}
          />
        </View>

        {/* Details Container */}
        <View style={styles.detailsContainer}>
          {/* Name & Verification */}
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>
              {profile.fullName}, {profile.age}
            </Text>
            {profile.isVerified && (
              <MaterialIcons
                name="verified"
                size={20}
                color={Theme.colors.secondary}
                style={{ marginLeft: 6 }}
              />
            )}
          </View>

          {/* Profession & Education */}
          <Text style={styles.professionText}>{profile.profession}</Text>
          <Text style={styles.educationText}>{profile.education}</Text>

          {/* Spec Tags Grid */}
          <View style={styles.specTagsContainer}>
            <View style={styles.specTag}>
              <MaterialIcons
                name="location-on"
                size={14}
                color={Theme.colors.primary}
              />
              <Text style={styles.specTagText}>
                {profile.city}, {profile.state}
              </Text>
            </View>

            <View style={styles.specTag}>
              <MaterialCommunityIcons
                name="heart-outline"
                size={14}
                color={Theme.colors.secondary}
              />
              <Text style={styles.specTagText}>
                {profile.religion} ({profile.motherTongue})
              </Text>
            </View>

            <View style={styles.specTag}>
              <MaterialCommunityIcons
                name="ruler"
                size={14}
                color={Theme.colors.tertiary}
              />
              <Text style={styles.specTagText}>
                {profile.heightFeet} • {t(`common.${profile.maritalStatus}`)}
              </Text>
            </View>

            <View style={styles.specTag}>
              <MaterialCommunityIcons
                name="star-four-points-outline"
                size={14}
                color={Theme.colors.primaryDark}
              />
              <Text style={styles.specTagText}>{profile.horoscopeAstro}</Text>
            </View>
          </View>

          {/* Bio Quote snippet */}
          {profile.bio ? (
            <View style={styles.bioContainer}>
              <Text numberOfLines={3} style={styles.bioText}>
                "{profile.bio}"
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>

      {/* Floating Action Buttons Footer */}
      <View style={styles.actionsFooter}>
        {/* Pass Button */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.passBtn]}
          onPress={onPass}
          activeOpacity={0.8}
        >
          <MaterialIcons name="close" size={26} color={Theme.colors.onSurfaceVariant} />
          <Text style={styles.passBtnText}>{t('home.actions.pass')}</Text>
        </TouchableOpacity>

        {/* Super Like Button */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.superlikeBtn]}
          onPress={onSuperLike}
          activeOpacity={0.8}
        >
          <MaterialIcons name="star" size={26} color="#d97706" />
          <Text style={styles.superlikeBtnText}>{t('home.actions.superlike')}</Text>
        </TouchableOpacity>

        {/* Connect Button */}
        <TouchableOpacity
          style={[styles.actionBtn, styles.connectBtn]}
          onPress={onConnect}
          activeOpacity={0.85}
        >
          <MaterialIcons name="favorite" size={26} color={Theme.colors.white} />
          <Text style={styles.connectBtnText}>{t('home.actions.connect')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
    marginVertical: Theme.spacing.xs,
  },
  cardContent: {
    width: '100%',
  },
  photoWrapper: {
    width: '100%',
    height: width * 0.95,
    position: 'relative',
    backgroundColor: Theme.colors.surfaceContainerLow,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  photoOverlayTouch: {
    ...StyleSheet.absoluteFillObject,
  },
  paginationRow: {
    position: 'absolute',
    top: 10,
    left: 16,
    right: 16,
    flexDirection: 'row',
    gap: 4,
    zIndex: 10,
  },
  paginationDot: {
    flex: 1,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  paginationDotActive: {
    backgroundColor: Theme.colors.white,
  },
  topBadgesRow: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.secondary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.pill,
    gap: 4,
  },
  verifiedBadgeText: {
    color: Theme.colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  matchScoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primaryContainer,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.pill,
    gap: 4,
  },
  matchScoreText: {
    color: Theme.colors.white,
    fontSize: 11,
    fontWeight: '700',
  },
  imageBottomGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
  },
  detailsContainer: {
    padding: Theme.spacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: Theme.typography.headlineLg.fontSize,
    fontWeight: Theme.typography.headlineLg.fontWeight,
    color: Theme.colors.onSurface,
  },
  professionText: {
    fontSize: Theme.typography.bodyLg.fontSize,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginTop: 2,
  },
  educationText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurfaceVariant,
    marginTop: 2,
  },
  specTagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: Theme.spacing.sm,
  },
  specTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceContainerLow,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.md,
    gap: 6,
  },
  specTagText: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '500',
    color: Theme.colors.onSurface,
  },
  bioContainer: {
    backgroundColor: Theme.colors.surfaceContainerLow,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginTop: Theme.spacing.sm,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primaryContainer,
  },
  bioText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurface,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  actionsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.md,
    paddingTop: Theme.spacing.xs,
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Theme.borderRadius.pill,
    gap: 6,
  },
  passBtn: {
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
  },
  passBtnText: {
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: '600',
    color: Theme.colors.onSurfaceVariant,
  },
  superlikeBtn: {
    backgroundColor: '#fef3c7',
    borderWidth: 1,
    borderColor: '#fcd34d',
  },
  superlikeBtnText: {
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: '600',
    color: '#92400e',
  },
  connectBtn: {
    backgroundColor: Theme.colors.primaryContainer,
  },
  connectBtnText: {
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: '700',
    color: Theme.colors.white,
  },
});
