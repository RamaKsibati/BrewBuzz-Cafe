// src/api/favoritesApi.ts
import axiosInstance from '../service/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchFavoritesFromApi = async () => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('Authentication token not found');

  const response = await axiosInstance.get('/api/favorites', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (response.status === 200 && response.data.favorites) {
    return response.data.favorites;
  } else {
    throw new Error('Failed to load favorites.');
  }
};

export const toggleFavoriteStatus = async (businessId: string) => {
  const token = await AsyncStorage.getItem('authToken');
  if (!token) throw new Error('Authentication token not found');

  await axiosInstance.post(`/api/favorites/${businessId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
