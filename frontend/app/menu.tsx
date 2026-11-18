import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/MenuPageStyles';
import axiosInstance from '../service/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios, { AxiosError } from 'axios';
import Header from '../components/Header';

interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  modifiers: string;
}

interface ShopDetails {
  location: string;
  hours: string;
}

interface BusinessHoursElement {
  id: string;
  name: string;
  sunday?: { elements: { start: number; end: number }[] };
  monday?: { elements: { start: number; end: number }[] };
  tuesday?: { elements: { start: number; end: number }[] };
  wednesday?: { elements: { start: number; end: number }[] };
  thursday?: { elements: { start: number; end: number }[] };
  friday?: { elements: { start: number; end: number }[] };
  saturday?: { elements: { start: number; end: number }[] };
}

interface BusinessData {
  id: number;
  name: string;
  location: string;
  hours: { elements: BusinessHoursElement[] };
}

const MenuPage = () => {
  const { shopId, shopName, previousScreen } = useLocalSearchParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [shopDetails, setShopDetails] = useState<ShopDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState<number>(0);
  const router = useRouter();
  const [menuDataLoaded, setMenuDataLoaded] = useState(false);
  const [shopDetailsLoaded, setShopDetailsLoaded] = useState(false);

  useEffect(() => {
    const storeShopName = async () => {
      try {
        await AsyncStorage.setItem('shopName', shopName as string);
      } catch (error) {
        console.error('Error storing shop name:', error);
      }
    };

    storeShopName();
    fetchShopDetails();
    fetchMenu();
    fetchShopRating();
  }, [shopName, shopId]);

  const fetchShopRating = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }
      const response = await axiosInstance.get(`/api/businesses/${shopId}/reviews`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        setRating(response.data.averageRating);
        setReviewCount(response.data.reviews.length);
      }
    } catch (error) {
      console.error('Error fetching shop rating:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(useCallback(() => {
    fetchShopRating();
  }, [shopId]));

  const fetchShopDetails = async () => {
    setLoading(true);
    setShopDetailsLoaded(false);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await axiosInstance.get<BusinessData>(`/api/business/${shopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data) {
        const businessHours = response.data.hours?.elements?.[0] ?? null;
        if (!businessHours) {
          setShopDetails({ location: response.data.location, hours: 'Hours not available' });
          return;
        }

        const getHours = (day: string) => {
          const elements = (businessHours as any)?.[day]?.elements;
          if (elements?.length > 0) {
            const { start, end } = elements[0];
            return `${formatTime(start)} - ${formatTime(end)}`;
          }
          return 'Closed';
        };

        const monFriHours = getHours('monday') === getHours('tuesday') &&
          getHours('tuesday') === getHours('wednesday') &&
          getHours('wednesday') === getHours('thursday') &&
          getHours('thursday') === getHours('friday')
          ? getHours('monday')
          : `${getHours('monday')} - ${getHours('friday')}`;

        const satSunHours = getHours('saturday') === getHours('sunday')
          ? getHours('saturday')
          : `${getHours('saturday')} - ${getHours('sunday')}`;

        const formattedHours = `Mon - Fri: ${monFriHours}\nSat - Sun: ${satSunHours}`;

        setShopDetails({ location: response.data.location || 'Location not available', hours: formattedHours });
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        setShopDetails({ location: 'Location not available', hours: 'Hours not available' });
      } else {
        console.error('Error fetching shop details:', error);
        setShopDetails({ location: 'Location not available', hours: 'Hours not available' });
      }
    } finally {
      setLoading(false);
      setShopDetailsLoaded(true);
    }
  };

  const formatTime = (time: number): string => {
    if (typeof time !== 'number') return 'N/A';
    const hours = Math.floor(time / 100);
    const minutes = time % 100;
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const fetchMenu = async () => {
    setLoading(true);
    setMenuDataLoaded(false);
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await axiosInstance.get(`/api/businesses/${shopId}/menu`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.menu) {
        setMenuItems(response.data.menu);
      } else {
        setMenuItems([]);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 500) {
        setMenuItems([]);
      } else {
        console.error('Error fetching menu:', error);
        setMenuItems([]);
      }
    } finally {
      setLoading(false);
      setMenuDataLoaded(true);
    }
  };

  const renderCategory = (category: string) => {
    const items = menuItems.filter((item) => item.category === category);
    if (items.length === 0) return null;
    return (
      <View key={category} style={styles.categoryContainer}>
        <Text style={[styles.categoryTitle, { fontSize: wp('5.5%') }]}>{category}</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.menuCard}>
            <View style={styles.menuContent}>
              <Image
                source={{ uri: item.image || 'https://via.placeholder.com/50' }}
                style={[styles.menuImage, { width: wp('18%'), height: wp('18%') }]}
              />
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuTitle, { fontSize: wp('4.8%') }]}>{item.name}</Text>
                <Text style={[styles.menuPrice, { fontSize: wp('4.5%') }]}>${item.price.toFixed(2)}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => {
                const modifiers = item.modifiers && item.modifiers.length > 0;
                router.push({
                  pathname: '/modifiers',
                  params: {
                    item: JSON.stringify(item),
                    noModifiers: String(!modifiers),
                    shopName: shopName as string,
                    shopAddress: shopDetails?.location,
                  },
                });
              }}
            >
              <Text style={[styles.addButtonText, { fontSize: wp('5.5%') }]}>+</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Menu`} showBackButton={true} onBack={() => router.back()} />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        contentInsetAdjustmentBehavior="automatic"
        style={{ marginTop: wp('0%') }}
      >
        <View style={styles.ratingContainer}>
          {loading ? (
            <ActivityIndicator size="small" color="#E27D19" />
          ) : (
            <Text style={styles.ratingText}>
              {rating !== null ? rating.toFixed(1) : 'N/A'} ({reviewCount})
            </Text>
          )}
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/reviews', params: { shopId, shopName: shopName as string } })}
            style={styles.reviewsLink}
          >
            <Text style={styles.reviewsLinkText}>Reviews →</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.locationContainer}>
          <Text style={styles.locationTitle}>Location:</Text>
          {shopDetailsLoaded ? (
            <Text style={styles.shopDetailItem}>{shopDetails?.location || 'Location not available'}</Text>
          ) : (
            <ActivityIndicator size="small" color="#E27D19" />
          )}
        </View>
        <View style={styles.hoursContainer}>
          <Text style={styles.hoursTitle}>Hours:</Text>
          {shopDetailsLoaded ? (
            <Text style={styles.hoursText}>{shopDetails?.hours || 'Hours not available'}</Text>
          ) : (
            <ActivityIndicator size="small" color="#E27D19" />
          )}
        </View>
        <Text style={[styles.menuHeading, { fontSize: wp('6%') }]}>Menu</Text>
        {loading || !menuDataLoaded ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#E27D19" />
          </View>
        ) : menuItems.length > 0 ? (
          [...new Set(menuItems.map((item) => item.category))]
            .filter((category) => category)
            .map((category) => <React.Fragment key={category}>{renderCategory(category)}</React.Fragment>)
        ) : (
          <View style={styles.noMenuContainer}>
            <Text style={styles.noMenuText}>No menu available</Text>
            <Text style={styles.noMenuSubText}>This shop has not yet uploaded a menu.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuPage;