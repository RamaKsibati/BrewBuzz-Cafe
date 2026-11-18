import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../service/axiosInstance';

// Define business and functionality interfaces
export interface Business {
  id: string;
  cover_photo: string;
  name: string;
  description: string;
  location: string;
  averageRating: number;
  reviewCount: number;
  isFavorite?: boolean; // Add this line
}

export interface Functionality {
  name: string;
  route: string;
}

export interface HomePageResult {
  success: boolean;
  coffeeShops?: Business[];
  functionality?: Functionality[];
  message?: string;
}

// Fetch homepage data
export const fetchHomePageData = async (): Promise<HomePageResult> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication token is missing. Please log in again.' };
    }

    const response = await axiosInstance.get('/api/homepage', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return {
        success: true,
        coffeeShops: response.data.businesses,
        functionality: response.data.functionality,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Unknown error occurred.';
      return { success: false, message };
    }
    return { success: false, message: 'Unexpected error occurred.' };
  }

  return { success: false, message: 'Unhandled case in homepage fetch process.' };
};
