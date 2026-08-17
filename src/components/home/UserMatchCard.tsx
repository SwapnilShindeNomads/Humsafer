import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../constants/theme';
import { useTranslation } from '../../i18n';
import { MatrimonialProfile } from '../../data/mockProfiles';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - Theme.spacing.md * 2;
const CARD_HEIGHT = CARD_WIDTH * 1.55;

export interface UserMatchCardProps {
  profile: MatrimonialProfile;
  onInterest?: () => void;
  onShortlist?: () => void;
  onIgnore?: () => void;
  onChat?: () => void;
  onPressProfile?: () => void;
}

export function UserMatchCard({
  profile,
  onInterest,
  onShortlist,
  onIgnore,
  onChat,
  onPressProfile,
}: UserMatchCardProps) {
  const { t } = useTranslation();

  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPressProfile}
        style={styles.cardContainer}
      >
        {/* Full-Bleed Background Image */}
        <Image
          source={{ uri: profile.photoUrls[0] }}
          style={styles.fullBleedImage}
          resizeMode="cover"
        />

        {/* Dark Gradient Overlay for Crisp Text Contrast */}
        <LinearGradient
          colors={['rgba(0,0,0,0.05)', 'rgba(0,0,0,0.3)', 'rgba(0,0,0,0.92)']}
          locations={[0, 0.45, 1]}
          style={styles.gradientOverlay}
        >
          {/* Top Header Badges Overlay */}
          <View style={styles.topBadgesRow}>
            <View />

            <View style={styles.topRightBadges}>
              {/* Photo Count Badge */}
              <View style={styles.photoCountBadge}>
                <Ionicons name="images-outline" size={13} color={Theme.colors.white} />
                <Text style={styles.photoCountText}>
                  {profile.photoUrls.length || 1}
                </Text>
              </View>

              {/* Just Joined / Verified Badge Pill */}
              <View style={styles.tagPill}>
                <Ionicons name="person-add-outline" size={13} color="#1e293b" />
                <Text style={styles.tagPillText}>{t('home.justJoined')}</Text>
              </View>
            </View>
          </View>

          {/* Bottom Card Content Details */}
          <View style={styles.bottomContent}>
            {/* Active Status */}
            <Text style={styles.activeStatusText}>{t('home.activeToday')}</Text>

            {/* Name & Age Title */}
            <Text style={styles.nameTitleText}>
              {profile.fullName.split(' ')[0]}, {profile.age}
            </Text>

            {/* Specs Line 1: Height • Location • Community */}
            <Text style={styles.specsLineText}>
              {profile.heightFeet} • {profile.city} • {profile.caste || profile.religion}
            </Text>

            {/* Specs Line 2: Profession • Income */}
            <Text style={styles.specsLineText}>
              {profile.profession} • Earns ₹15–20 Lacs p.a
            </Text>

            {/* Specs Line 3: Education */}
            <Text style={styles.specsLineText}>{profile.education}</Text>

            {/* Divider Line */}
            <View style={styles.dividerLine} />

            {/* Managed By Footer Caption */}
            <Text style={styles.managedByText}>
              {t('home.managedBy')} <Text style={{ fontWeight: '600' }}>Self</Text>
            </Text>

            {/* Bottom 4 Circular Action Buttons Bar */}
            <View style={styles.actionButtonsRow}>
              {/* Action 1: Interest */}
              <TouchableOpacity
                style={styles.actionBtnContainer}
                activeOpacity={0.8}
                onPress={onInterest}
              >
                <View style={styles.circularIconBtn}>
                  <Ionicons name="mail-outline" size={22} color={Theme.colors.white} />
                </View>
                <Text style={styles.actionLabel}>{t('home.actions.interest')}</Text>
              </TouchableOpacity>

              {/* Action 2: Shortlist */}
              <TouchableOpacity
                style={styles.actionBtnContainer}
                activeOpacity={0.8}
                onPress={onShortlist}
              >
                <View style={styles.circularIconBtn}>
                  <Ionicons name="star-outline" size={22} color={Theme.colors.white} />
                </View>
                <Text style={styles.actionLabel}>{t('home.actions.shortlist')}</Text>
              </TouchableOpacity>

              {/* Action 3: Ignore */}
              <TouchableOpacity
                style={styles.actionBtnContainer}
                activeOpacity={0.8}
                onPress={onIgnore}
              >
                <View style={styles.circularIconBtn}>
                  <Ionicons name="close-outline" size={24} color={Theme.colors.white} />
                </View>
                <Text style={styles.actionLabel}>{t('home.actions.ignore')}</Text>
              </TouchableOpacity>

              {/* Action 4: Chat */}
              <TouchableOpacity
                style={styles.actionBtnContainer}
                activeOpacity={0.8}
                onPress={onChat}
              >
                <View style={styles.circularIconBtn}>
                  <Ionicons name="chatbubble-outline" size={22} color={Theme.colors.white} />
                </View>
                <Text style={styles.actionLabel}>{t('home.actions.chat')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    marginBottom: Theme.spacing.lg,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: Theme.colors.black,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  fullBleedImage: {
    ...StyleSheet.absoluteFillObject,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'space-between',
    padding: Theme.spacing.md,
  },
  topBadgesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  topRightBadges: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  photoCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: Theme.borderRadius.md,
    gap: 4,
  },
  photoCountText: {
    color: Theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  tagPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.pill,
    gap: 4,
  },
  tagPillText: {
    color: '#1e293b',
    fontSize: 12,
    fontWeight: '700',
  },
  bottomContent: {
    width: '100%',
  },
  activeStatusText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  nameTitleText: {
    color: Theme.colors.white,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 6,
  },
  specsLineText: {
    color: 'rgba(255, 255, 255, 0.92)',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
  },
  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginVertical: 10,
  },
  managedByText: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 12,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  actionButtonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 4,
  },
  actionBtnContainer: {
    alignItems: 'center',
  },
  circularIconBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  actionLabel: {
    color: Theme.colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
});
