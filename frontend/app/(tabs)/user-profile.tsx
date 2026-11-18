import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styles from '../../styles/UserProfileScreenStyles';
import Header from '../../components/Header'; // Import the Header component

export default function UserProfileScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        if (user) {
          const parsedUser = JSON.parse(user);
          setUserName(parsedUser.full_name || 'Guest');
          setUserEmail(parsedUser.email || 'N/A');
        }
      } catch (error) {
        console.error('Error loading profile:', error);
        Alert.alert('Error', 'Failed to load profile data.');
      }
    };

    loadUserProfile();
  }, []);

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              router.replace('/login');
            } catch (error) {
              console.error('Sign out error:', error);
              Alert.alert('Error', 'Failed to sign out.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />

      <View style={styles.profileSection}>
        <Image 
          source={require('../../assets/profileframe.png')} 
          style={[styles.profileImage, { width: wp('30%'), height: wp('30%') }]} 
        />
        <Text style={[styles.profileName, { fontSize: wp('5%') }]}>{userName}</Text>
        <View style={styles.emailContainer}>
          <Image 
            source={require('../../assets/email.png')} 
            style={[styles.emailIcon, { width: wp('6%'), height: wp('6%') }]} 
          />
          <Text style={[styles.emailText, { fontSize: wp('4%') }]}>{userEmail}</Text>
        </View>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={() => router.push('/change-password')}>
          <Text style={[styles.optionText, { fontSize: wp('4.5%') }]}>Change Password</Text>
        </TouchableOpacity>
        
        <TouchableOpacity>
          <Text style={[styles.optionText, { fontSize: wp('4.5%') }]}>Payment Method</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleSignOut}>
          <Text style={[styles.optionText, { fontSize: wp('4.5%') }]}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}