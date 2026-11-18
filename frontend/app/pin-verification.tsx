import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { resetPassword } from '../api/forgotPasswordApi';
import styles from '../styles/PINVerificationStyles';
import axiosInstance from '../service/axiosInstance';
import axios from 'axios';

export default function PINVerificationScreen() {
  const { email, token } = useLocalSearchParams();
  const [pin, setPin] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);

  const inputRefs = React.useRef<Array<TextInput | null>>([null, null, null, null]);
  const router = useRouter();

  const handlePinChange = (value: string, index: number) => {
    if (value.length <= 1) {
      setPin((prevPin) => {
        const newPin = [...prevPin];
        newPin[index] = value;

        if (value && index < 3) {
          inputRefs.current[index + 1]?.focus();
        }

        if (index === 3) {
          setTimeout(() => {
            const fullPin = newPin.join('');
            if (fullPin.length === 4) {
              handleVerify(fullPin);
            }
          }, 100);
        }

        return newPin;
      });
    }
  };

  const handleResend = async () => {
    try {
      if (typeof email === 'string') {
        const response = await axiosInstance.post('/api/forgot-password', { email });
        Alert.alert('Success', 'Verification code resent to your email');
      } else {
        Alert.alert('Error', 'Invalid email format.');
      }
    } catch (error: unknown) {
      console.error('Resend Error:', error);
      let errorMessage = 'Failed to resend verification code';
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || 'Server error';
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      Alert.alert('Error', errorMessage);
    }
  };

  const validatePin = () => {
    const fullPin = pin.join('');
    if (fullPin.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit verification code');
      return false;
    }
    return true;
  };

  const handleVerify = (enteredPin?: string) => {
    const fullPin = enteredPin || pin.join('');

    if (fullPin.length !== 4) {
      Alert.alert('Error', 'Please enter a valid 4-digit PIN.');
      return;
    }

    try {
      if (typeof token === 'string') {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        const storedPin = String(decodedToken.pin);

        if (fullPin === storedPin) {
          setVerificationComplete(true);
        } else {
          Alert.alert('Error', 'Invalid PIN. Please try again.');
          setPin(['', '', '', '']);
        }
      } else {
        Alert.alert('Error', 'Invalid token format');
      }
    } catch (error) {
      console.error('❌ Error decoding token:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const validatePassword = () => {
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return false;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validatePassword()) return;

    const formattedPin = parseInt(pin.join(''), 10);

    setLoading(true);
    try {
      if (typeof token === 'string') {
        const response = await resetPassword(token, formattedPin, newPassword);

        if (!response) throw new Error('Failed to reset password');

        Alert.alert('Success', 'Your password has been reset successfully', [
          { text: 'OK', onPress: () => router.push('/Login') },
        ]);
      } else {
        Alert.alert('Error', 'Invalid token format.');
      }
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error', error.message || 'Failed to reset password');
    }
  };

  if (!verificationComplete) {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Enter Verification Code</Text>
        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => (inputRefs.current[index] = ref)}
              style={styles.pinInput}
              value={digit}
              onChangeText={(value) => handlePinChange(value, index)}
              keyboardType="number-pad"
              maxLength={1}
              autoFocus={index === 0}
            />
          ))}
        </View>
        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive a code?</Text>
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resendLink}>Resend</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.orContainer}>
          <Text style={styles.orText}>or</Text>
        </View>
        <TouchableOpacity style={styles.privacyContainer} onPress={() => {}}>
          <Text style={styles.privacyText}>Privacy Policy</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.signinLink}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
        <Text style={styles.title}>Enter New Password</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Enter New Password</Text>
          <TextInput
            style={styles.passwordInput}
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            placeholder="At least 8 digits"
          />
        </View>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordLabel}>Confirm New Password</Text>
          <TextInput
            style={styles.passwordInput}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={handleResetPassword} disabled={loading}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.signinLink}>Back to Sign In</Text>
        </TouchableOpacity>
      </View>
    );
  }
}