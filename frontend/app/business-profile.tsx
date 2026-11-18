import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/BusinessSplashScreenStyles';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header'; // Import Header

export default function BusinessSplashScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Business Page" showBackButton={true} onBack={() => router.back()} />

      <View style={styles.content}>
        <Image source={require('../assets/BusinessSplashImage.png')} style={styles.mainImage} />
        <Text style={styles.descriptionText}>Take your business to the next level!</Text>

        <Link href="/business-registration" asChild>
          <TouchableOpacity
            style={styles.getStartedButton}
          >
            <Text style={styles.getStartedText}>Get Started</Text>
          </TouchableOpacity>
        </Link>
      </View>

    </SafeAreaView>
  );
}