import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { changePassword } from '../api/changePasswordApi';
import styles from '../styles/ChangePasswordStyles';
import Button from '../components/Button';
import Header from '../components/Header';

export default function ChangePasswordScreen() {
    const router = useRouter();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const handlePasswordChange = async () => {
        try {
            setIsLoading(true);
            const result = await changePassword(oldPassword, newPassword, confirmNewPassword);

            if (result.success) {
                Alert.alert(
                    'Success',
                    'Password changed successfully!',
                    [{
                        text: 'OK',
                        onPress: () => router.push('/(tabs)/user-profile')
                    }]
                );
            } else {
                Alert.alert('Error', result.message || 'Failed to change password');
            }
        } catch (error) {
            Alert.alert('Error', 'An unexpected error occurred');
            console.error('Password change error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Change Password" showBackButton={true} onBack={() => router.push('/(tabs)/user-profile')} />

            <View style={styles.mainContent}>
                <View style={styles.passwordContainer}>
                    <TextInput 
                        style={styles.passwordInput}
                        placeholder="Old Password"
                        secureTextEntry={!isOldPasswordVisible}
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                    <Pressable onPress={() => setIsOldPasswordVisible(!isOldPasswordVisible)}>
                        <Text style={styles.eyeIcon}>{isOldPasswordVisible ? '🙈' : '👁️'}</Text>
                    </Pressable>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="New Password"
                        secureTextEntry={!isNewPasswordVisible}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                    <Pressable onPress={() => setIsNewPasswordVisible(!isNewPasswordVisible)}>
                        <Text style={styles.eyeIcon}>{isNewPasswordVisible ? '🙈' : '👁️'}</Text>
                    </Pressable>
                </View>

                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.passwordInput}
                        placeholder="Confirm New Password"
                        secureTextEntry={!isConfirmPasswordVisible}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                    <Pressable onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                        <Text style={styles.eyeIcon}>{isConfirmPasswordVisible ? '🙈' : '👁️'}</Text>
                    </Pressable>
                </View>

                <Button 
                    text="Change Password" 
                    onPress={handlePasswordChange} 
                    style={styles.button}
                />
            </View>
        </SafeAreaView>
    );
}