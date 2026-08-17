import { Tabs } from "expo-router";
import React from "react";
import { StitchTabBar } from "../../src/components/common/StitchTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <StitchTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="matches" options={{ title: "Matches" }} />
      <Tabs.Screen name="connections" options={{ title: "Connections" }} />
      <Tabs.Screen name="messages" options={{ title: "Messages" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
