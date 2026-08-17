import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { ScreenWrapper } from '../../src/components/common/ScreenWrapper';
import { Theme } from '../../src/constants/theme';
import { CURRENT_USER_PROFILE } from '../../src/data/mockProfiles';
import { useTranslation } from '../../src/i18n';

export default function UserProfileEditScreen() {
  const router = useRouter();
  const { t } = useTranslation();

  const [fullName, setFullName] = useState(CURRENT_USER_PROFILE.fullName);
  const [profession, setProfession] = useState(CURRENT_USER_PROFILE.profession);
  const [education, setEducation] = useState(CURRENT_USER_PROFILE.education);
  const [city, setCity] = useState(CURRENT_USER_PROFILE.city);
  const [state, setState] = useState(CURRENT_USER_PROFILE.state);
  const [religion, setReligion] = useState(CURRENT_USER_PROFILE.religion);
  const [motherTongue, setMotherTongue] = useState(CURRENT_USER_PROFILE.motherTongue);
  const [heightCm, setHeightCm] = useState(CURRENT_USER_PROFILE.heightCm.toString());
  const [horoscope, setHoroscope] = useState(CURRENT_USER_PROFILE.horoscopeAstro);
  const [bio, setBio] = useState(CURRENT_USER_PROFILE.bio);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      router.back();
    }, 1200);
  };

  return (
    <ScreenWrapper
      showHeader
      title={t('profile.userProfileUpdate')}
      showBackButton
      keyboardAvoiding
      keyboardOffset={30}
      scrollable
      scrollContainerStyle={styles.contentContainer}
      rightAction={
        <TouchableOpacity activeOpacity={0.7} onPress={handleSave}>
          <Text style={styles.saveBtnText}>{t('common.save')}</Text>
        </TouchableOpacity>
      }
    >
      {savedSuccess && (
        <View style={styles.successBanner}>
          <MaterialIcons name="check-circle" size={20} color={Theme.colors.white} />
          <Text style={styles.successText}>{t('profile.saveSuccess')}</Text>
        </View>
      )}

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrapper}>
              <Image
                source={{ uri: CURRENT_USER_PROFILE.photoUrls[0] }}
                style={styles.avatarImage}
              />
              <TouchableOpacity style={styles.cameraBadge} activeOpacity={0.8}>
                <MaterialIcons name="photo-camera" size={16} color={Theme.colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>{t('profile.photos')}</Text>
          </View>

          {/* Basic Details Group */}
          <View style={styles.formGroupCard}>
            <Text style={styles.groupTitle}>{t('profile.userProfileUpdate')}</Text>

            {/* Full Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('profile.fullName')}</Text>
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>

            {/* Profession */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('common.profession')}</Text>
              <TextInput
                style={styles.textInput}
                value={profession}
                onChangeText={setProfession}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>

            {/* Education */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('common.education')}</Text>
              <TextInput
                style={styles.textInput}
                value={education}
                onChangeText={setEducation}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>

            {/* City & State Row */}
            <View style={styles.twoColRow}>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>{t('profile.city')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={city}
                  onChangeText={setCity}
                  placeholderTextColor={Theme.colors.onSurfaceVariant}
                />
              </View>
              <View style={[styles.inputContainer, { flex: 1 }]}>
                <Text style={styles.inputLabel}>{t('profile.state')}</Text>
                <TextInput
                  style={styles.textInput}
                  value={state}
                  onChangeText={setState}
                  placeholderTextColor={Theme.colors.onSurfaceVariant}
                />
              </View>
            </View>
          </View>

          {/* Culture & Background Group */}
          <View style={styles.formGroupCard}>
            <Text style={styles.groupTitle}>{t('common.religion')}</Text>

            {/* Religion */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('common.religion')}</Text>
              <TextInput
                style={styles.textInput}
                value={religion}
                onChangeText={setReligion}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>

            {/* Mother Tongue */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('common.motherTongue')}</Text>
              <TextInput
                style={styles.textInput}
                value={motherTongue}
                onChangeText={setMotherTongue}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>

            {/* Horoscope */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('profile.horoscope')}</Text>
              <TextInput
                style={styles.textInput}
                value={horoscope}
                onChangeText={setHoroscope}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>

            {/* Height */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>{t('common.height')} ({t('common.cm')})</Text>
              <TextInput
                style={styles.textInput}
                value={heightCm}
                onChangeText={setHeightCm}
                keyboardType="numeric"
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>
          </View>

          {/* Bio Section */}
          <View style={styles.formGroupCard}>
            <Text style={styles.groupTitle}>{t('common.bio')}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.textInput, styles.multilineInput]}
                value={bio}
                onChangeText={setBio}
                multiline
                numberOfLines={4}
                placeholderTextColor={Theme.colors.onSurfaceVariant}
              />
            </View>
          </View>

          {/* Bottom Save Action Button */}
          <TouchableOpacity
            activeOpacity={0.85}
            style={styles.saveSubmitBtn}
            onPress={handleSave}
          >
            <Text style={styles.saveSubmitBtnText}>{t('common.save')}</Text>
          </TouchableOpacity>
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
  saveBtnText: {
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: '700',
    color: Theme.colors.primary,
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.secondary,
    padding: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    marginBottom: Theme.spacing.md,
    gap: 8,
  },
  successText: {
    color: Theme.colors.white,
    fontWeight: '600',
    fontSize: Theme.typography.bodyMd.fontSize,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
    position: 'relative',
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: Theme.colors.primaryContainer,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Theme.colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  changePhotoText: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
    color: Theme.colors.primary,
    marginTop: Theme.spacing.xs,
  },
  formGroupCard: {
    backgroundColor: Theme.colors.surfaceContainerLowest,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  groupTitle: {
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: '700',
    color: Theme.colors.onSurface,
    marginBottom: Theme.spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  inputContainer: {
    marginBottom: Theme.spacing.sm,
  },
  inputLabel: {
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: '600',
    color: Theme.colors.onSurfaceVariant,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderRadius: Theme.borderRadius.md,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 10,
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurface,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  twoColRow: {
    flexDirection: 'row',
    gap: 12,
  },
  saveSubmitBtn: {
    backgroundColor: Theme.colors.primaryContainer,
    borderRadius: Theme.borderRadius.pill,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Theme.spacing.sm,
    shadowColor: Theme.shadows.activeBtn.shadowColor,
    shadowOffset: Theme.shadows.activeBtn.shadowOffset,
    shadowOpacity: Theme.shadows.activeBtn.shadowOpacity,
    shadowRadius: Theme.shadows.activeBtn.shadowRadius,
    elevation: Theme.shadows.activeBtn.elevation,
  },
  saveSubmitBtnText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: '700',
  },
});
