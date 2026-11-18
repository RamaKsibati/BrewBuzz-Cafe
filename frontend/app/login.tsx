import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/LoginScreenStyles';
import { handleLogin, LoginResult } from '../api/authApi';
import Button from '../components/Button';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const onLogin = async () => {
    const normalizedEmail = email.trim().toLowerCase();
    const result: LoginResult = await handleLogin(normalizedEmail, password);
    
    if (result.success) {
      // Navigate to home tab
      router.replace('/(tabs)/');
    } else {
      Alert.alert(
        'Login Error',
        result.message || 'Unknown error occurred. Please try again.',
        [{ text: 'OK' }],
        { cancelable: true }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Text style={styles.eyeIcon}>{isPasswordVisible ? '🙈' : '👁️'}</Text>
        </Pressable>
      </View>

      <Button text="Sign in" onPress={onLogin} />

      <TouchableOpacity onPress={() => router.push('/create-account')}>
        <Text style={styles.linkText}>Create an account?</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => router.push('/email-input')}>
        <Text style={styles.linkText}>Reset Password</Text>
      </TouchableOpacity>
      
      <TouchableOpacity>
        <Text style={styles.privacyText}>Privacy Policy</Text>
      </TouchableOpacity>
    </View>
  );
}