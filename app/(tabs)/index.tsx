import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { checkUser, createUser } from '../store/userSlice';
import { router } from 'expo-router';

export default function Login() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
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
        router.push('Home' as never);
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
        console.error('User check failed:', error);
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

    const { success } = await LocalAuthentication.authenticateAsync();
    if (success) {
      alert('Biometric login successful!');
      router.push('Home' as never);
    }
  };

  return (
    <View>
      {!user && isNewUser ? (
        <TextInput placeholder="Name" value={name} onChangeText={setName} />
      ) : (
        user && <Text>Welcome back, {user.name}!</Text>
      )}

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        onBlur={handleCheckUser}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {user?.useBiometrics && (
        <Button title="Login with Face ID / Touch ID" onPress={handleBiometricLogin} />
      )}

      <Button
        title={isNewUser ? 'Sign Up' : 'Login'}
        onPress={handleSubmit}
        disabled={loading}
      />
    </View>
  );
}

// import { Image } from "expo-image";
// import { Platform, StyleSheet, Text } from "react-native";

// import { HelloWave } from "@/components/HelloWave";
// import ParallaxScrollView from "@/components/ParallaxScrollView";
// import { ThemedText } from "@/components/ThemedText";
// import { ThemedView } from "@/components/ThemedView";

// export default function HomeScreen() {
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
//       headerImage={
//         <Image
//           source={require("@/assets/images/partial-react-logo.png")}
//           style={styles.reactLogo}
//         />
//       }>
//       <Text className=" text-red-500 text-2xl font-bold">I am new Here</Text>
//       <ThemedView style={styles.titleContainer}>
//         <ThemedText type="title">Welcome Adun!</ThemedText>
//         <HelloWave />
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 1: Try it</ThemedText>
//         <ThemedText>
//           Edit
//           <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>
//           to see changes. Press
//           <ThemedText type="defaultSemiBold">
//             {Platform.select({
//               ios: "cmd + d",
//               android: "cmd + m",
//               web: "F12",
//             })}
//           </ThemedText>
//           to open developer tools.
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 2: Explore</ThemedText>
//         <ThemedText>
//           {`Tap the Explore tab to learn more about what's included in this starter app.`}
//         </ThemedText>
//       </ThemedView>
//       <ThemedView style={styles.stepContainer}>
//         <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
//         <ThemedText>
//           {`When you're ready, run `}
//           <ThemedText type="defaultSemiBold">
//             npm run reset-project
//           </ThemedText>
//           to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>
//           directory. This will move the current
//           <ThemedText type="defaultSemiBold">app</ThemedText> to
//           <ThemedText type="defaultSemiBold">app-example</ThemedText>.
//         </ThemedText>
//       </ThemedView>
//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: "absolute",
//   },
// });
