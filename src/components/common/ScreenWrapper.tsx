import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ScrollViewProps,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Theme } from "../../constants/theme";
import { HamsafarAppHeader } from "./HamsafarAppHeader";

export interface ScreenWrapperProps {
  children: React.ReactNode;
  title?: string;
  showHeader?: boolean;
  showAppHeader?: boolean;
  showBackButton?: boolean;
  onBackPress?: () => void;
  bgWhite?: boolean;
  backgroundColor?: string;
  rightAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  statusBarStyle?: "dark" | "light";

  // Keyboard avoidance
  keyboardAvoiding?: boolean;
  keyboardOffset?: number;

  // ScrollView configuration
  scrollable?: boolean;
  scrollContainerStyle?: StyleProp<ViewStyle>;
  scrollViewProps?: Omit<ScrollViewProps, "contentContainerStyle">;
}

export function ScreenWrapper({
  children,
  title,
  showHeader = false,
  showAppHeader = false,
  showBackButton = true,
  onBackPress,
  bgWhite = false,
  backgroundColor,
  rightAction,
  style,
  contentStyle,
  statusBarStyle = "dark",
  keyboardAvoiding = true,
  keyboardOffset = 0,
  scrollable = false,
  scrollContainerStyle,
  scrollViewProps,
}: ScreenWrapperProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [androidKeyboardHeight, setAndroidKeyboardHeight] = useState(0);

  // On Android: listen to keyboard events and strictly reset to 0 on hide
  useEffect(() => {
    if (Platform.OS !== "android" || !keyboardAvoiding) {
      setAndroidKeyboardHeight(0);
      return;
    }

    const showSub = Keyboard.addListener("keyboardDidShow", (e) => {
      setAndroidKeyboardHeight(e.endCoordinates.height + keyboardOffset);
    });
    const hideSub = Keyboard.addListener("keyboardDidHide", () => {
      setAndroidKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [keyboardAvoiding, keyboardOffset]);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (router.canGoBack()) {
      router.back();
    }
  };

  const gradientColors = bgWhite
    ? [Theme.colors.surfaceContainerLowest, Theme.colors.surfaceContainerLowest]
    : backgroundColor
      ? [backgroundColor, backgroundColor]
      : Theme.colors.backgroundGradient;

  const statusBarColor = bgWhite
    ? Theme.colors.surfaceContainerLowest
    : backgroundColor || Theme.colors.backgroundGradient[0];

  const innerContent = scrollable ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={[styles.scrollContainer, scrollContainerStyle]}
      {...scrollViewProps}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  const renderBody = () => {
    if (!keyboardAvoiding) {
      return innerContent;
    }

    if (Platform.OS === "ios") {
      return (
        <KeyboardAvoidingView
          behavior="padding"
          style={styles.keyboardContainer}
          keyboardVerticalOffset={keyboardOffset}
        >
          {innerContent}
        </KeyboardAvoidingView>
      );
    }

    // Android: dynamic padding with strict 0 on hide
    return (
      <View
        style={[
          styles.keyboardContainer,
          { paddingBottom: androidKeyboardHeight },
        ]}
      >
        {innerContent}
      </View>
    );
  };

  return (
    <LinearGradient
      colors={
        gradientColors as unknown as readonly [string, string, ...string[]]
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, style]}
    >
      <StatusBar
        barStyle={statusBarStyle === "dark" ? "dark-content" : "light-content"}
        backgroundColor={statusBarColor}
      />
      {/* Top Safe Area Spacing */}
      <View style={{ height: insets.top }} />

      {/* Sticky Hamsafar App Header for Tab Screens */}
      {showAppHeader && <HamsafarAppHeader />}

      {/* Custom Configurable Header */}
      {showHeader && (
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            {showBackButton && (
              <TouchableOpacity
                onPress={handleBack}
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
            )}
          </View>

          <View style={styles.headerCenter}>
            {title ? (
              <Text numberOfLines={1} style={styles.headerTitle}>
                {title}
              </Text>
            ) : null}
          </View>

          <View style={styles.headerRight}>{rightAction || null}</View>
        </View>
      )}

      {/* Screen Body Content */}
      {renderBody()}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.glassBorder,
    backgroundColor: Theme.colors.transparent,
  },
  headerLeft: {
    width: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  headerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerRight: {
    minWidth: 44,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  backButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 4,
  },
  headerTitle: {
    fontSize: Theme.typography.headlineMd.fontSize,
    fontWeight: Theme.typography.headlineMd.fontWeight,
    color: Theme.colors.onSurface,
  },
  content: {
    flex: 1,
  },
  keyboardContainer: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
});
