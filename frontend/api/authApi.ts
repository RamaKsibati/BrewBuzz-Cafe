import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../service/axiosInstance';

// Define the type for the login result
export interface LoginResult {
  success: boolean;
  token?: string;
  user?: object;
  message?: string;
}
export interface CreateAccountResult {
    success: boolean;
    message?: string;
    token?: string;
    user?: object; // Adjust to your user object shape
  }


// Define the async function for handling login logic
export const handleLogin = async (email: string, password: string): Promise<LoginResult> => {
  try {
    const response = await axiosInstance.post('api/signin', { // Replace with your IP address
      email,
      password,
    });

    if (response.status === 200) {
      const { token, user } = response.data;

      // Save token securely
      await AsyncStorage.setItem('authToken', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      return { success: true, token, user };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || 'Unknown error occurred.';
      return { success: false, message };
    }
    return { success: false, message: 'Unexpected error occurred.' };
  }
  
  // Default return for unhandled paths
  return { success: false, message: 'Unhandled case in login process.' };
};
export const handleCreateAccount = async (
    fullName: string,
    email: string,
    password: string,
    state: string,
    zipcode: string,
    userCategory: 'Customer' | 'Business' | 'Admin'
  ): Promise<CreateAccountResult> => {
    try {
      const response = await axiosInstance.post('/api/signup', {
        full_name: fullName,
        email,
        password,
        state,
        zipcode,
        user_category: userCategory,
      });
  
      if (response.status === 201) {
        const { message, token, user } = response.data;
        return { success: true, message, token, user };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 'Unknown error occurred.';
        return { success: false, message };
      }
      return { success: false, message: 'Unexpected error occurred.' };
    }
  
    return { success: false, message: 'Unhandled case in create account process.' };
  };
  