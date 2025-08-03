import React from 'react';
import { View, Text, Button } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBiometrics } from '../store/userSlice';
import { AppDispatch, RootState } from '../store';
import { router } from 'expo-router';

export default function BiometricSetup() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);

  const enableBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      alert('Biometrics not supported/enrolled!');
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync();
    if (success && user?.id) {
      dispatch(toggleBiometrics({ userId: user.id, useBiometrics: true }));
      alert('Biometrics enabled! 🚀');
    }
  };

  return (
    <View>
      <Text>Enable Face ID / Touch ID for faster login?</Text>
      <Button title="Enable Biometrics" onPress={enableBiometrics} />
      <Button title="Skip" onPress={() => router.push('Home' as never)} />
    </View>
  );
}
