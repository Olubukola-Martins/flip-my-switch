import * as LocalAuthentication from "expo-local-authentication";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { toggleBiometrics } from "./store/userSlice";
import { isLikelyFaceIDDevice } from "./utility/helperFn";

export default function BiometricSetup() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const [biometricLabel, setBiometricLabel] = useState("Biometrics");

  useEffect(() => {
    if (isLikelyFaceIDDevice()) {
      setBiometricLabel("Face ID");
    } else {
      setBiometricLabel("Touch ID");
    }
  }, []);

  const enableBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (!hasHardware || !isEnrolled || supportedTypes.length === 0) {
      alert("Biometrics not supported or not enrolled!");
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: `Authenticate with ${biometricLabel}`, 
    });

    if (success && user?.id) {
      dispatch(toggleBiometrics({ userId: user.id, useBiometrics: true }));
      alert(`${biometricLabel} enabled! 🚀`);
    }
  };

  return (
    <View>
      <Text>Enable {biometricLabel} for faster login?</Text>
      <Button title={`Enable ${biometricLabel}`} onPress={enableBiometrics} />
      <Button title="Skip" onPress={() => router.push("home" as never)} />
    </View>
  );
}
