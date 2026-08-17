import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Theme } from "../src/constants/theme";
import { LanguageProvider } from "../src/i18n";

export default function RootLayout() {
  return (
    <LanguageProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Theme.colors.background },
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="chat/[id]"
          options={{ presentation: "card", animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="notifications/index"
          options={{ presentation: "card", animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="profile/edit"
          options={{ presentation: "card", animation: "slide_from_bottom" }}
        />
      </Stack>
    </LanguageProvider>
  );
}
