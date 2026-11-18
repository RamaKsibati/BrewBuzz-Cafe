import React, { useState } from 'react';
import { View, Image, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { requestPin } from '../api/forgotPasswordApi';
import axios from 'axios';
import styles from '../styles/EmailInputStyles';
import Button from '../components/Button';

export default function EmailInputScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleRequestPin = async () => {
        if (!email.trim()) {
            Alert.alert('Error', 'Please enter your email address');
            return;
        }
        
        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        setLoading(true);
        try {
            const data = await requestPin(email);
            Alert.alert(
                'PIN Request',
                data.message,
                [{
                    text: 'OK', 
                    onPress: () => router.push({
                        pathname: '/pin-verification',
                        params: { email, token: data.token }
                    })
                }]
            );
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 404) {
                    Alert.alert('Error', 'Email not found. Please enter a registered email.');
                } else {
                    Alert.alert('Error', error.response?.data?.message || 'Server error. Please try again later.');
                }
            } else {
                Alert.alert('Error', 'Failed to request PIN. Please try again later.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../assets/logo.png')} 
                style={styles.logo}
            />

            <TextInput 
                placeholder='Enter email'
                style={styles.input}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType="email-address"
            />

            <TouchableOpacity onPress={() => router.push('/login')}>
                <Text style={styles.linkText}>Back to sign in</Text>
            </TouchableOpacity>

            <Button 
                text="Send" 
                onPress={handleRequestPin}
            />

            <TouchableOpacity 
                style={{ marginTop: 200 }}
                onPress={() => router.push('/create-account')}
            >
                <Text style={styles.linkText}>Create an account?</Text>
            </TouchableOpacity>

            <TouchableOpacity>
                <Text style={styles.privacyText}>Privacy Policy</Text>
            </TouchableOpacity>
        </View>
    );
}