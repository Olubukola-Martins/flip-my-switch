import React, { useState } from 'react';
import {  Text, TextInput, TouchableOpacity, ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store';
import { checkUser, createUser } from './store/userSlice';
import { router } from 'expo-router';
import * as LocalAuthentication from 'expo-local-authentication';
import Animated, { FadeInUp } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { user, isNewUser, loading } = useSelector((state: RootState) => state.user);

  const resetFields = () => {
    setUsername('');
    setPassword('');
    setName('');
  };

  const handleSubmit = async () => {
    if (isNewUser) {
      try {
        const result = await dispatch(
          createUser({ name, username, password, useBiometrics: false })
        ).unwrap();
        if (result) {
          resetFields();
          alert('Signup successful! 🎉');
          router.push('BiometricSetup' as never);
        }
      } catch (error: any) {
        alert('Signup failed: ' + error?.message);
      }
    } else {
      if (user?.password === password) {
        resetFields();
        alert('Login successful! 🎉');
        router.push('home' as never);
      } else {
        alert('Wrong password!');
      }
    }
  };

  const handleCheckUser = async () => {
    if (username) {
      try {
        await dispatch(checkUser(username));
      } catch (error: any) {
        alert('Error checking user: ' + error?.message);
      }
    }
  };

  const handleBiometricLogin = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      alert('Biometrics not available!');
      return;
    }

    const { success } = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      fallbackLabel: '',
      disableDeviceFallback: true,
    });

    if (success) {
      alert('Biometric login successful!');
      router.push('home' as never);
    }
  };

  return (
    <LinearGradient
      colors={['#fce4ec', '#f8bbd0', '#f48fb1']}
      className="flex flex-1 justify-center items-center px-6 "
        style={{ ...StyleSheet.absoluteFillObject }}
      
    >

      <LottieView
        source={require('./../assets/animations/login.json')}
        autoPlay
        loop
        style={{ width: 140, height: 140, marginLeft:'auto',marginRight:'auto', marginBottom: 20, marginTop: 40 }} 
      />

      <Animated.View entering={FadeInUp.duration(800)} className="w-full max-w-md bg-white/30 p-6 rounded-3xl shadow-lg ">
        <Text className="text-center text-3xl font-bold text-pink-800 mb-4">Flip The Switch 💡</Text>
        <Text className="text-center text-lg text-pink-700 mb-6">
          {isNewUser ? 'Create your account' : 'Welcome back!'}
        </Text>

        {isNewUser && (
          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#a1a1aa"
            value={name}
            onChangeText={setName}
            className="bg-white/60 text-pink-900 px-4 py-3 rounded-xl mb-4"
          />
        )}

        <TextInput
          placeholder="Username"
          placeholderTextColor="#a1a1aa"
          value={username}
          onChangeText={setUsername}
          onBlur={handleCheckUser}
          className="bg-white/60 text-pink-900 px-4 py-3 rounded-xl mb-4"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#a1a1aa"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          className="bg-white/60 text-pink-900 px-4 py-3 rounded-xl mb-6"
        />

        {user?.useBiometrics && (
          <TouchableOpacity
            onPress={handleBiometricLogin}
            className="bg-pink-600 py-3 rounded-xl mb-4"
          >
            <Text className="text-white text-center font-semibold">Login with Biometrics</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={loading}
          className={`py-3 rounded-xl ${loading ? 'bg-gray-400' : 'bg-pink-700'}`}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-center font-semibold">
              {isNewUser ? 'Sign Up' : 'Login'}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}


