import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenWrapper } from "../../src/components/common/ScreenWrapper";
import { Theme } from "../../src/constants/theme";
import { MOCK_PROFILES } from "../../src/data/mockProfiles";
import { useTranslation } from "../../src/i18n";

export default function ChatDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const scrollViewRef = useRef<ScrollView>(null);

  const profile = MOCK_PROFILES.find((p) => p.id === id) || MOCK_PROFILES[0];
  const candidateFirstName = profile.fullName.split(" ")[0];

  // States for Unlock Contact flow
  const [unlockState, setUnlockState] = useState<
    "none" | "pending" | "unlocked"
  >("none");
  const [viewMode, setViewMode] = useState<"sender" | "receiver">("sender"); // Demo toggle
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [inputText, setInputText] = useState("");
  const [chatMessages, setChatMessages] = useState<
    {
      id: string;
      sender: "me" | "other" | "system";
      text: string;
      time: string;
    }[]
  >([
    {
      id: "m1",
      sender: "other",
      text: `Hi there! I'm ${candidateFirstName}. How can I help you today?`,
      time: "10:24 AM",
    },
    {
      id: "m2",
      sender: "me",
      text: `I'm looking for some travel advice for my upcoming trip to Jaipur.`,
      time: "10:26 AM",
    },
    {
      id: "m3",
      sender: "other",
      text: `That sounds wonderful! Jaipur is beautiful this time of year. What specifically would you like to know?`,
      time: "10:27 AM",
    },
    {
      id: "m4",
      sender: "me",
      text: `Can you recommend some local spots for authentic Rajasthani food?`,
      time: "10:29 AM",
    },
  ]);

  const scrollToBottom = (animated = true) => {
    scrollViewRef.current?.scrollToEnd({ animated });
  };

  // Automatically scroll to latest message when messages or request states change
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(true);
    }, 200);
    return () => clearTimeout(timer);
  }, [chatMessages, unlockState, viewMode]);

  // Automatically scroll to bottom when keyboard opens (handles iOS animation duration)
  useEffect(() => {
    const didShowSub = Keyboard.addListener("keyboardDidShow", () => {
      scrollToBottom(true);
    });

    const willShowSub = Keyboard.addListener("keyboardWillShow", (e) => {
      const duration = e?.duration || 250;
      const timer = setTimeout(() => {
        scrollToBottom(true);
      }, duration + 50);
      return () => clearTimeout(timer);
    });

    return () => {
      didShowSub.remove();
      willShowSub.remove();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const addSystemMessage = (text: string) => {
    const timeStr = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    setChatMessages((prev) => [
      ...prev,
      {
        id: `sys_${Date.now()}`,
        sender: "system",
        text,
        time: timeStr,
      },
    ]);
  };

  const handleSendMessage = () => {
    if (inputText.trim().length === 0) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: "me" as const,
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInputText("");
  };

  const handleSendUnlockRequest = () => {
    setIsModalVisible(false);
    setUnlockState("pending");
    showToast(t("messages.contactRequestSent"));
  };

  const handleAcceptRequest = () => {
    setUnlockState("unlocked");
    addSystemMessage(t("messages.requestAccepted"));
    showToast(t("messages.contactUnlocked"));
  };

  const handleDeclineRequest = () => {
    setUnlockState("none");
    addSystemMessage(t("messages.requestDeclined"));
    showToast(t("messages.requestCancelled"));
  };

  const handleRemind = () => {
    showToast(t("messages.reminderSent"));
  };

  const handleCancelRequest = () => {
    setUnlockState("none");
    addSystemMessage(t("messages.requestCancelledStatus"));
    showToast(t("messages.requestCancelled"));
  };

  const handlePhoneCall = () => {
    const phoneNum = "+919876543210";
    Linking.openURL(`tel:${phoneNum}`).catch(() => {
      Alert.alert(
        "Phone Call",
        `Calling ${profile.fullName} at ${t("messages.phoneNumber")}`,
      );
    });
  };

  return (
    <ScreenWrapper
      showHeader={false}
      keyboardOffset={Platform.OS === "ios" ? -20 : 0}
    >
      {/* STITCH CHAT HEADER BAR */}
      <View style={styles.headerContainer}>
        {/* Left Section: Back Arrow + Candidate Avatar + Name & Online Status */}
        <View style={styles.headerLeftRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={20}
              color={Theme.colors.onSurface}
            />
          </TouchableOpacity>

          <View style={styles.avatarWrapper}>
            <Image
              source={{ uri: profile.photoUrls[0] }}
              style={styles.avatarImage}
            />
            <View style={styles.onlineBadgeDot} />
          </View>

          <View style={styles.headerTextWrapper}>
            <Text numberOfLines={1} style={styles.headerNameText}>
              {profile.fullName}
            </Text>
            <Text style={styles.headerStatusText}>{t("home.activeToday")}</Text>
          </View>
        </View>

        {/* Right Section: Unlock Contact Button / Call Button */}
        {unlockState === "unlocked" ? (
          <TouchableOpacity
            style={styles.callIconHeaderBtn}
            activeOpacity={0.8}
            onPress={handlePhoneCall}
          >
            <Ionicons
              name="call"
              size={20}
              color={Theme.colors.primaryContainer}
            />
          </TouchableOpacity>
        ) : unlockState === "pending" ? (
          <TouchableOpacity
            style={styles.pendingHeaderBtn}
            activeOpacity={0.8}
            onPress={() => setIsModalVisible(true)}
          >
            <MaterialIcons
              name="hourglass-empty"
              size={14}
              color={Theme.colors.primaryDark}
            />
            <Text style={styles.pendingHeaderText}>
              {t("messages.requested")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.unlockContactBtn}
            activeOpacity={0.8}
            onPress={() => setIsModalVisible(true)}
          >
            <Ionicons
              name="lock-closed-outline"
              size={15}
              color={Theme.colors.primaryContainer}
            />
            <Text style={styles.unlockContactText}>
              {t("messages.unlockContact")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* DEMO MODE ROLE TOGGLE BAR */}
      <View style={styles.roleToggleBar}>
        <Text style={styles.roleToggleLabel}>Demo View:</Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setViewMode("sender")}
          style={[
            styles.roleChip,
            viewMode === "sender" && styles.roleChipActive,
          ]}
        >
          <Text
            style={[
              styles.roleChipText,
              viewMode === "sender" && styles.roleChipTextActive,
            ]}
          >
            Sender (Me)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setViewMode("receiver")}
          style={[
            styles.roleChip,
            viewMode === "receiver" && styles.roleChipActive,
          ]}
        >
          <Text
            style={[
              styles.roleChipText,
              viewMode === "receiver" && styles.roleChipTextActive,
            ]}
          >
            Receiver ({candidateFirstName})
          </Text>
        </TouchableOpacity>
      </View>

      {/* TOAST BANNER */}
      {toastMessage && (
        <View style={styles.toastBanner}>
          <MaterialIcons
            name="info-outline"
            size={18}
            color={Theme.colors.white}
          />
          <Text style={styles.toastText}>{toastMessage}</Text>
        </View>
      )}

      {/* Messages Feed */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatScroll}
        contentContainerStyle={styles.chatContentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }}
      >
        {chatMessages.map((msg) => {
          if (msg.sender === "system") {
            return (
              <View key={msg.id} style={styles.systemMsgContainer}>
                <Text style={styles.systemMsgText}>
                  {msg.text} • {msg.time}
                </Text>
              </View>
            );
          }

          const isMe = msg.sender === "me";
          return (
            <View
              key={msg.id}
              style={[
                styles.msgBubbleWrapper,
                isMe ? styles.msgBubbleWrapperMe : styles.msgBubbleWrapperOther,
              ]}
            >
              <View
                style={[
                  styles.msgBubble,
                  isMe ? styles.msgBubbleMe : styles.msgBubbleOther,
                ]}
              >
                <Text
                  style={[
                    styles.msgText,
                    isMe ? styles.msgTextMe : styles.msgTextOther,
                  ]}
                >
                  {msg.text}
                </Text>
                <Text
                  style={[
                    styles.msgTime,
                    isMe ? styles.msgTimeMe : styles.msgTimeOther,
                  ]}
                >
                  {msg.time}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* FLOATING IN-CHAT CONTACT REQUEST CARD (Appears only when request is pending) */}
      {unlockState === "pending" && (
        <View style={styles.floatingRequestCardContainer}>
          <View style={styles.requestCard}>
            {/* Card Top Icon Badge */}
            <View style={styles.requestBadgeCircle}>
              <Ionicons
                name="card-outline"
                size={18}
                color={Theme.colors.primaryContainer}
              />
            </View>

            {/* Card Message & Actions */}
            {viewMode === "receiver" ? (
              /* RECEIVER SIDE CARD: Accept / Decline */
              <View style={styles.cardContentBox}>
                <Text style={styles.requestCardMessage}>
                  <Text style={{ fontWeight: "700" }}>{profile.fullName}</Text>{" "}
                  {t("messages.contactRequestReceived")}
                </Text>

                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.acceptActionBtn}
                    activeOpacity={0.85}
                    onPress={handleAcceptRequest}
                  >
                    <Text style={styles.acceptActionBtnText}>
                      {t("common.accept")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.declineActionBtn}
                    activeOpacity={0.85}
                    onPress={handleDeclineRequest}
                  >
                    <Text style={styles.declineActionBtnText}>
                      {t("common.decline")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              /* SENDER SIDE CARD: Remind / Cancel Request */
              <View style={styles.cardContentBox}>
                <Text style={styles.requestCardMessage}>
                  {t("messages.contactRequestSent").replace(
                    "{name}",
                    profile.fullName,
                  )}
                </Text>

                <View style={styles.cardActionsRow}>
                  <TouchableOpacity
                    style={styles.remindActionBtn}
                    activeOpacity={0.85}
                    onPress={handleRemind}
                  >
                    <Text style={styles.remindActionBtnText}>
                      {t("messages.remind")}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.cancelRequestActionBtn}
                    activeOpacity={0.85}
                    onPress={handleCancelRequest}
                  >
                    <Text style={styles.cancelRequestActionBtnText}>
                      {t("messages.cancelRequest")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Floating Bottom Chat Input Bar */}
      <View
        style={[
          styles.bottomBarWrapper,
          { paddingBottom: Math.max(insets.bottom, 16) + 4 },
        ]}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachBtn} activeOpacity={0.7}>
            <Ionicons
              name="add-circle-outline"
              size={24}
              color={Theme.colors.onSurfaceVariant}
            />
          </TouchableOpacity>

          <TextInput
            style={styles.textInput}
            placeholder={t("messages.typePlaceholder")}
            placeholderTextColor={Theme.colors.onSurfaceVariant}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />

          <TouchableOpacity
            style={styles.sendBtn}
            activeOpacity={0.85}
            onPress={handleSendMessage}
          >
            <Ionicons name="send" size={18} color={Theme.colors.white} />
          </TouchableOpacity>
        </View>
      </View>

      {/* UNLOCK CONTACT MODAL DIALOG */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalBadgeCircle}>
              <Ionicons
                name={
                  viewMode === "receiver"
                    ? "card-outline"
                    : "lock-closed-outline"
                }
                size={28}
                color={Theme.colors.primaryContainer}
              />
            </View>

            <Text style={styles.modalTitle}>
              {viewMode === "receiver"
                ? `Request Contact Details`
                : `Unlock ${candidateFirstName}'s Contact`}
            </Text>

            <Text style={styles.modalSubtitle}>
              {t("messages.unlockModalSubtitle").replace(
                "{name}",
                candidateFirstName,
              )}
            </Text>

            <TouchableOpacity
              style={styles.modalSendBtn}
              activeOpacity={0.85}
              onPress={handleSendUnlockRequest}
            >
              <Text style={styles.modalSendBtnText}>
                {t("messages.sendRequest")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.modalCancelBtn}
              activeOpacity={0.7}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCancelBtnText}>
                {t("messages.maybeLater")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.glassBorder,
  },
  headerLeftRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 8,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 10,
  },
  avatarImage: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  onlineBadgeDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 11,
    height: 11,
    borderRadius: 5.5,
    backgroundColor: Theme.colors.secondary,
    borderWidth: 2,
    borderColor: Theme.colors.white,
  },
  headerTextWrapper: {
    flex: 1,
  },
  headerNameText: {
    fontSize: Theme.typography.headlineMd.fontSize - 3,
    fontWeight: "700",
    color: Theme.colors.onSurface,
  },
  headerStatusText: {
    fontSize: 11,
    color: Theme.colors.secondary,
    fontWeight: "600",
    marginTop: -1,
  },
  unlockContactBtn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.md,
  },
  unlockContactText: {
    fontSize: 9,
    fontWeight: "800",
    color: Theme.colors.primaryContainer,
    letterSpacing: 0.2,
    marginTop: 2,
  },
  pendingHeaderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.md,
    gap: 4,
  },
  pendingHeaderText: {
    fontSize: 10,
    fontWeight: "700",
    color: Theme.colors.primaryDark,
  },
  callIconHeaderBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Theme.colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  roleToggleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Theme.colors.surfaceContainerLow,
    paddingVertical: 6,
    paddingHorizontal: Theme.spacing.md,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.glassBorder,
  },
  roleToggleLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: Theme.colors.onSurfaceVariant,
  },
  roleChip: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: Theme.borderRadius.pill,
    backgroundColor: Theme.colors.surfaceContainerHighest,
  },
  roleChipActive: {
    backgroundColor: Theme.colors.primaryContainer,
  },
  roleChipText: {
    fontSize: 10,
    fontWeight: "600",
    color: Theme.colors.onSurface,
  },
  roleChipTextActive: {
    color: Theme.colors.white,
  },
  toastBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.primaryDark,
    paddingVertical: 8,
    paddingHorizontal: Theme.spacing.md,
    justifyContent: "center",
    gap: 8,
  },
  toastText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: "600",
  },
  keyboardContainer: {
    flex: 1,
  },
  chatScroll: {
    flex: 1,
  },
  chatContentContainer: {
    padding: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  msgBubbleWrapper: {
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  msgBubbleWrapperMe: {
    justifyContent: "flex-end",
  },
  msgBubbleWrapperOther: {
    justifyContent: "flex-start",
  },
  msgBubble: {
    maxWidth: "78%",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: Theme.borderRadius.lg,
  },
  msgBubbleMe: {
    backgroundColor: Theme.colors.primaryContainer,
    borderBottomRightRadius: 4,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: 2,
  },
  msgBubbleOther: {
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: 2,
  },
  msgText: {
    fontSize: Theme.typography.bodyMd.fontSize,
    lineHeight: 20,
  },
  msgTextMe: {
    color: Theme.colors.white,
    fontWeight: "500",
  },
  msgTextOther: {
    color: Theme.colors.onSurface,
    fontWeight: "400",
  },
  msgTime: {
    fontSize: 10,
    marginTop: 4,
    alignSelf: "flex-end",
  },
  msgTimeMe: {
    color: "rgba(255, 255, 255, 0.85)",
  },
  msgTimeOther: {
    color: Theme.colors.onSurfaceVariant,
  },
  systemMsgContainer: {
    alignSelf: "center",
    marginVertical: 10,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: Theme.borderRadius.pill,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  systemMsgText: {
    fontSize: 11,
    color: Theme.colors.onSurfaceVariant,
    fontWeight: "500",
    textAlign: "center",
  },
  floatingRequestCardContainer: {
    paddingHorizontal: Theme.spacing.md,
    paddingBottom: Theme.spacing.xs,
    alignItems: "center",
  },
  inChatRequestCardWrapper: {
    marginVertical: Theme.spacing.md,
    alignItems: "center",
  },
  requestCard: {
    width: "100%",
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.lg,
    padding: Theme.spacing.sm + 2,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: 3,
  },
  requestBadgeCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Theme.colors.surfaceContainerLow,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
  },
  cardContentBox: {
    width: "100%",
    alignItems: "center",
  },
  requestCardTitle: {
    fontSize: Theme.typography.headlineMd.fontSize - 3,
    fontWeight: "700",
    color: Theme.colors.onSurface,
    marginBottom: 4,
  },
  requestCardMessage: {
    fontSize: Theme.typography.bodyMd.fontSize - 1,
    color: Theme.colors.onSurface,
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 18,
  },
  cardActionsRow: {
    flexDirection: "row",
    width: "100%",
    gap: 8,
  },
  acceptActionBtn: {
    flex: 1,
    backgroundColor: Theme.colors.primaryContainer,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Theme.shadows.activeBtn.shadowColor,
    shadowOffset: Theme.shadows.activeBtn.shadowOffset,
    shadowOpacity: Theme.shadows.activeBtn.shadowOpacity,
    shadowRadius: Theme.shadows.activeBtn.shadowRadius,
    elevation: 2,
  },
  acceptActionBtnText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelSm.fontSize + 1,
    fontWeight: "700",
  },
  declineActionBtn: {
    flex: 1,
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  declineActionBtnText: {
    color: Theme.colors.onSurface,
    fontSize: Theme.typography.labelSm.fontSize + 1,
    fontWeight: "600",
  },
  remindActionBtn: {
    flex: 1,
    backgroundColor: Theme.colors.primaryContainer,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  remindActionBtnText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: "700",
  },
  cancelRequestActionBtn: {
    flex: 1,
    backgroundColor: Theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: Theme.colors.outlineVariant,
    paddingVertical: 8,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelRequestActionBtnText: {
    color: Theme.colors.onSurfaceVariant,
    fontSize: Theme.typography.labelSm.fontSize,
    fontWeight: "600",
  },
  unlockedDetailsContainer: {
    alignItems: "center",
    width: "100%",
  },
  phoneNumberText: {
    fontSize: Theme.typography.headlineLg.fontSize - 2,
    fontWeight: "800",
    color: Theme.colors.secondary,
    marginVertical: Theme.spacing.xs,
    letterSpacing: 0.5,
  },
  callNowBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: Theme.spacing.lg,
    borderRadius: Theme.borderRadius.pill,
    gap: 8,
    marginTop: Theme.spacing.xs,
  },
  callNowBtnText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: "700",
  },
  bottomBarWrapper: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.xs + 2,
    backgroundColor: Theme.colors.transparent,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.pill,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: Theme.shadows.card.shadowColor,
    shadowOffset: Theme.shadows.card.shadowOffset,
    shadowOpacity: Theme.shadows.card.shadowOpacity,
    shadowRadius: Theme.shadows.card.shadowRadius,
    elevation: Theme.shadows.card.elevation,
  },
  attachBtn: {
    padding: 6,
  },
  textInput: {
    flex: 1,
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurface,
    paddingHorizontal: 8,
    maxHeight: 100,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Theme.colors.primaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: Theme.spacing.lg,
  },
  modalCard: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: Theme.colors.surfaceContainerLowest,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Theme.colors.glassBorder,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalBadgeCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#fff0e6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.md,
  },
  modalTitle: {
    fontSize: Theme.typography.headlineMd.fontSize,
    fontWeight: "800",
    color: Theme.colors.onSurface,
    textAlign: "center",
    marginBottom: Theme.spacing.xs,
  },
  modalSubtitle: {
    fontSize: Theme.typography.bodyMd.fontSize,
    color: Theme.colors.onSurfaceVariant,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: Theme.spacing.lg,
  },
  modalSendBtn: {
    width: "100%",
    backgroundColor: Theme.colors.primaryContainer,
    paddingVertical: 14,
    borderRadius: Theme.borderRadius.md,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Theme.spacing.xs,
    shadowColor: Theme.shadows.activeBtn.shadowColor,
    shadowOffset: Theme.shadows.activeBtn.shadowOffset,
    shadowOpacity: Theme.shadows.activeBtn.shadowOpacity,
    shadowRadius: Theme.shadows.activeBtn.shadowRadius,
    elevation: 4,
  },
  modalSendBtnText: {
    color: Theme.colors.white,
    fontSize: Theme.typography.labelLg.fontSize,
    fontWeight: "700",
  },
  modalCancelBtn: {
    width: "100%",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelBtnText: {
    color: Theme.colors.onSurfaceVariant,
    fontSize: Theme.typography.bodyMd.fontSize,
    fontWeight: "600",
  },
});
