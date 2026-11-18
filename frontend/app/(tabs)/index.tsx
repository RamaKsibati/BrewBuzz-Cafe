import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Alert, Text, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../../styles/HomePageStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchHomePageData, Business } from '../../api/homepageApi';
import { useRouter, useLocalSearchParams, useFocusEffect } from 'expo-router';
import axiosInstance from '../../service/axiosInstance';
import axios from 'axios';

const favoritesFilled = require('../../assets/favorites-filled.png');
const favoritesOutline = require('../../assets/favorites.png');

export default function HomePage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>([]); 
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');
  const [isBusinessOwner, setIsBusinessOwner] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");

  const loadData = useCallback(async () => {
    try {
      const [businessResult, user] = await Promise.all([
        fetchHomePageData(),
        AsyncStorage.getItem('user')
      ]);

      if (businessResult.success) {
        setBusinesses(businessResult.coffeeShops || []);
        setFilteredBusinesses(businessResult.coffeeShops || []);
      }

      if (user) {
        const parsedUser = JSON.parse(user);
        setUserName(parsedUser.full_name || 'Guest');
        setIsBusinessOwner(parsedUser.user_category === 'Business');
      }
      
      await fetchFavorites();
    } catch (error) {
      Alert.alert('Error', 'Failed to load data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    loadData();
  }, [loadData]));

  useEffect(() => {
    if (params.refresh) {
      loadData();
    }
  }, [params.refresh]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredBusinesses(
      query.trim() === "" 
        ? businesses 
        : businesses.filter(business =>
            business.name.toLowerCase().includes(query.toLowerCase()) ||
            business.location.toLowerCase().includes(query.toLowerCase())
          )
    );
  };

  const fetchFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        await AsyncStorage.removeItem('authToken');
        router.replace('/login');
        return;
      }
  
      const response = await axiosInstance.get('/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (response.status === 403) {
        await AsyncStorage.removeItem('authToken');
        router.replace('/login');
        return;
      }
    
      if (response.status === 200) {
        setFavorites(new Set(response.data.favorites?.map((b: { id: string }) => b.id) || []));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        await AsyncStorage.removeItem('authToken');
        router.replace('/login');
      }
      console.error('Error fetching favorites:', error);
    }
  };
  
  const handleFavoriteToggle = async (businessId: string) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Session Expired', 'Please log in again.');
        router.replace('/login');
        return;
      }

      await axiosInstance.post(`/api/favorites/${businessId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFavorites(prev => {
        const updated = new Set(prev);
        updated.has(businessId) ? updated.delete(businessId) : updated.add(businessId);
        return updated;
      });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite status.');
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <StatusBar barStyle="light-content" backgroundColor="#313131" />
        <View style={styles.headerTextContainer}>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.userName}>{userName}</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Image source={require('../../assets/colorednotification.png')} style={styles.navIconImage} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TouchableOpacity>
          <Image source={require("../../assets/search.png")} style={styles.searchIcon} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search coffee"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>

      <ScrollView contentContainerStyle={styles.businessList}>
        {filteredBusinesses.map((business) => (
          <TouchableOpacity
            key={business.id}
            style={styles.businessCard}
            onPress={() => router.push({
              pathname: "/menu",
              params: { 
                shopId: business.id, 
                shopName: business.name,
                previousScreen: "Home"  
              }
            })}
          >
            <Image source={{ uri: business.cover_photo }} style={styles.businessImage} />
            <View style={styles.businessInfo}>
              <Text style={styles.businessName}>{business.name}</Text>
              <Text style={styles.businessAddress}>{business.location}</Text>

              <View style={styles.starRatingsContainer}>
                <View style={styles.starRatings}>
                  {Array(5).fill(0).map((_, i) => (
                    <Text 
                      key={i} 
                      style={i < business.averageRating ? styles.star : styles.starInactive}
                    >
                      ★
                    </Text>
                  ))}
                </View>
                <Text style={styles.averageRatingText}>{business.averageRating.toFixed(1)}</Text>
              </View>
            </View>

            <TouchableOpacity 
              onPress={() => handleFavoriteToggle(business.id)} 
              style={styles.favoriteButton}
            >
              <Image 
                source={favorites.has(business.id) ? favoritesFilled : favoritesOutline} 
                style={styles.favoriteIcon} 
              />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}