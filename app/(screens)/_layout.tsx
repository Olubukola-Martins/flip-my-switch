import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native";

export default function ScreensLayout() {
  return (
    <>
      <SafeAreaView />
      <StatusBar translucent backgroundColor="transparent" style="auto" />
      <Stack>
        <Stack.Screen name="BiometricSetup" options={{ headerShown: false }} />
        {/* <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" /> */}
      </Stack>
    </>
  );
}
