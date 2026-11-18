import { useEffect, useState } from 'react';
import { Alert, Image } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchUserBusinesses } from '../../api/businessApi';

interface User {
  user_category: string;
  // Add other properties as needed
}

interface TabIconProps {
  focused: boolean;
  sourceFocused: any;
  sourceUnfocused: any;
}

const TabIcon: React.FC<TabIconProps> = ({ focused, sourceFocused, sourceUnfocused }) => (
  <Image
    source={focused ? sourceFocused : sourceUnfocused}
    style={{ width: 24, height: 24 }}
  />
);

export default function TabsLayout() {
  const router = useRouter();
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);

  useEffect(() => {
    const checkBusinessOwner = async () => {
      try {
        const userString = await AsyncStorage.getItem('user');
        if (userString) {
          const user: User = JSON.parse(userString);
          setIsBusinessOwner(user.user_category === 'Business');
        }
      } catch (error) {
        console.error('Error checking business owner status:', error);
        Alert.alert('Error', 'Failed to retrieve user data.');
      }
    };
    checkBusinessOwner();
  }, []);

  const handleBusinessPress = async () => {
    try {
      const result = await fetchUserBusinesses();
      if (result.success) {
        if (result.businesses && result.businesses.length > 0) {
          router.push('/business-page');
        } else {
          router.push('/business-profile');
        }
      } else {
        Alert.alert('Business Error', result.message || 'Failed to check business status.');
      }
    } catch (error) {
      console.error('Business Error:', error);
      Alert.alert('Business Error', 'Failed to check business details.');
    }
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#313131',
          borderTopColor: '#313131',
        },
        tabBarActiveTintColor: 'white',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              sourceFocused={require('../../assets/home-filled.png')}
              sourceUnfocused={require('../../assets/home.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              sourceFocused={require('../../assets/favorites-filled.png')}
              sourceUnfocused={require('../../assets/favorites.png')}
            />
          ),
        }}
      />
      {isBusinessOwner ? (
        <Tabs.Screen
          name="business-page"
          options={{
            title: 'Business',
            tabBarIcon: ({ focused }) => (
              <TabIcon
                focused={focused}
                sourceFocused={require('../../assets/suitcase-filled.png')}
                sourceUnfocused={require('../../assets/suitcase.png')}
              />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              handleBusinessPress();
            },
          }}
        />
      ) : null}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              sourceFocused={require('../../assets/cart-filled.png')}
              sourceUnfocused={require('../../assets/cart.png')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="user-profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              sourceFocused={require('../../assets/profile-filled.png')}
              sourceUnfocused={require('../../assets/profile.png')}
            />
          ),
        }}
      />
    </Tabs>
  );
}