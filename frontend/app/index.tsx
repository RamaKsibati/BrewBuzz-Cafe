import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/WelcomeScreenStyles';
import Button from '../components/Button'; // Import the Button component
import { useRouter } from 'expo-router'; // Import useRouter

export default function WelcomeScreen() {
  const router = useRouter(); // Initialize router

  return (
    <View style={styles.container}>
      {/* Top Section: Coffee Image */}
      <View style={styles.topSection}>
        <Image
          source={require('../assets/coffee.jpg')} // Replace with your image
          style={styles.image}
        />
      </View>

      {/* Bottom Section: Content */}
      <View style={styles.bottomSection}>
        {/* Title */}
        <Text style={styles.title}>
          Enjoy your <Text style={styles.highlight}>coffee</Text>{'\n'}
          before your activity
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Boost your productivity{'\n'}
          and build your mood!{'\n'}{'\n'}
        </Text>

        {/* Get Started Button */}
        <Button
          text="Get started"
          onPress={() => router.push('/login')} // Use router.push
        />
      </View>
    </View>
  );
}