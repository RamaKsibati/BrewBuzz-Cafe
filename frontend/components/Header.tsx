import React from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showNotification?: boolean;
  onBack?: () => void; // Add optional onBack prop
}

const Header = ({ title, showBackButton = true, showNotification = true, onBack }: HeaderProps) => {
  const router = useRouter();

  const handleBackButtonPress = () => {
    if (onBack) {
      onBack(); // Call the provided onBack function
    } else {
      router.back(); // Use default router.back()
    }
  };

  return (
    <View style={styles.header}>
      <StatusBar barStyle="light-content" backgroundColor="#313131" />
      {showBackButton && (
        <TouchableOpacity style={styles.backArrow} onPress={handleBackButtonPress}>
          <Image source={require('../assets/BackArrow.png')} style={styles.backArrowImage} />
        </TouchableOpacity>
      )}
      <Text style={styles.pageTitle}>{title}</Text>
      {showNotification && (
        <TouchableOpacity style={styles.notificationIcon}>
          <Image source={require('../assets/colorednotification.png')} style={styles.notificationIconImage} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#313131',
  },
  backArrow: {
    padding: 8,
  },
  backArrowImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  notificationIcon: {
    padding: 8,
  },
  notificationIconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});

export default Header;