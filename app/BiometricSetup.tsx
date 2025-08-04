import React, { useEffect, useState } from 'react';
import {  Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { toggleBiometrics } from './store/userSlice';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import { isLikelyFaceIDDevice } from './utility/helperFn';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
// import LottieView from 'lottie-react-native';

export default function BiometricSetup() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.user);
  const [biometricLabel, setBiometricLabel] = useState('Biometrics');

  useEffect(() => {
    if (isLikelyFaceIDDevice()) {
      setBiometricLabel('Face ID');
    } else {
      setBiometricLabel('Touch ID');
    }
  }, []);

  const enableBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    if (!hasHardware || !isEnrolled || supportedTypes.length === 0) {
      Alert.alert('Biometrics not supported or not enrolled!');
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: `Authenticate with ${biometricLabel}`,
      // fallbackLabel: '',
      // disableDeviceFallback: true,
    });

    if (success && user?.id) {
      dispatch(toggleBiometrics({ userId: user.id, useBiometrics: true }));
      Alert.alert(`${biometricLabel} enabled! 🚀`);
      router.push('home' as never);
    }
  };

  return (
    <LinearGradient
      colors={['#fce4ec', '#f8bbd0', '#f48fb1']}
      className="flex-1 justify-center items-center px-6"
        style={{ ...StyleSheet.absoluteFillObject }}
      
    >
      {/* <LottieView
        source={require('./assets/animations/biometric-setup.json')}
        autoPlay
        loop
        style={{ width: 200, height: 200 }}
      /> */}

      <Animated.View entering={FadeInUp.duration(800)} className="w-full max-w-md bg-white/30 p-6 rounded-3xl shadow-lg">
        <Text className="text-center text-3xl font-bold text-pink-800 mb-4">Flip My Switch 💡</Text>
        <Text className="text-center text-lg text-pink-700 mb-6">
          Enable {biometricLabel} for faster login?
        </Text>

        <TouchableOpacity
          onPress={enableBiometrics}
          className="bg-pink-600 py-3 rounded-xl mb-4"
        >
          <Text className="text-white text-center font-semibold">Enable {biometricLabel}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('home' as never)}
          className="bg-gray-300 py-3 rounded-xl"
        >
          <Text className="text-center text-gray-800 font-semibold">Skip</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

