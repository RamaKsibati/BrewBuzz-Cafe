import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import styles from '../../styles/FavoritesPageStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchFavoritesFromApi, toggleFavoriteStatus } from '../../api/favoritesApi';
import { useRouter, useFocusEffect } from 'expo-router'; // Import useFocusEffect
import Header from '../../components/Header';

const favoritesFilled = require('../../assets/favorites-filled.png');

interface Business {
  id: string;
  name: string;
  location: string;
  cover_photo: string;
  averageRating: number;
}

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFavoritesFromApi();
      setFavorites(data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      Alert.alert('Error', 'Failed to load favorites.');
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    loadFavorites();
  }, [loadFavorites]));

  const handleFavoriteToggle = async (businessId: string) => {
    try {
      await toggleFavoriteStatus(businessId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((business) => business.id !== businessId)
      );
    } catch (error) {
      console.error('Error toggling favorite:', error);
      Alert.alert('Error', 'Failed to update favorite status.');
    }
  };

  const navigateToMenu = (business: Business) => {
    router.push({
      pathname: '/menu',
      params: {
        shopId: business.id,
        shopName: business.name,
        previousScreen: 'Favorites',
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Favorites" />

      <View style={{ flex: 1 }}>
        {loading ? (
          <View style={styles.emptyContainer}>
            <ActivityIndicator size="large" color="#E27D19" />
            <Text style={styles.emptyText}>Loading favorites...</Text>
          </View>
        ) : favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorites yet!</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.favoritesList}>
            {favorites.map((business) => (
              <TouchableOpacity
                key={business.id}
                style={styles.businessCard}
                onPress={() => navigateToMenu(business)}
              >
                <Image
                  source={{ uri: business.cover_photo }}
                  style={styles.businessImage}
                />
                <View style={styles.businessInfo}>
                  <Text style={styles.businessName}>{business.name}</Text>
                  <Text style={styles.businessAddress}>{business.location}</Text>

                  <View style={styles.starRatingsContainer}>
                    <View style={styles.starRatings}>
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <Text
                            key={i}
                            style={
                              i < business.averageRating
                                ? styles.star
                                : styles.starInactive
                            }
                          >
                            ★
                          </Text>
                        ))}
                    </View>
                    <Text style={styles.averageRatingText}>
                      {typeof business.averageRating === 'number'
                        ? business.averageRating.toFixed(1)
                        : '0'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleFavoriteToggle(business.id)}
                    style={styles.favoriteButton}
                  >
                    <Image
                      source={favoritesFilled}
                      style={styles.favoriteIcon}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default FavoritesPage;