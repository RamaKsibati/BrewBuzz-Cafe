import axiosInstance from '../service/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface BusinessCreateResult {
  success: boolean;
  message?: string;
}

export interface BusinessUpdateResult {
  success: boolean;
  message?: string;
}

export interface BusinessFetchResult {
  success: boolean;
  businesses?: Business[];
  business?: Business;
  message?: string;
}

export interface Business {
  id: string;
  name: string;
  location: string;
  description?: string;
  phone_number?: string;
  merchant_id?: string;
  clover_api_token?: string;
  cover_photo: string;
}

// ✅ Create Business API Call
export const createBusiness = async (formData: FormData): Promise<BusinessCreateResult> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication token is missing. Please log in again.' };
    }

    const response = await axiosInstance.post('/api/createbusiness', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      return { success: true, message: 'Business registered successfully.' };
    }

    return { success: false, message: 'Unexpected response from the server.' };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Unexpected error occurred.' };
  }
};

// ✅ Fetch Logged-in User's Businesses API Call
export const fetchUserBusinesses = async (): Promise<BusinessFetchResult> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication token is missing. Please log in again.' };
    }

    const response = await axiosInstance.get('/api/businesses', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true, businesses: response.data.businesses || [] };
    }

    return { success: false, message: response.data.message || 'Failed to fetch businesses.' };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Unexpected error occurred.' };
  }
};

// ✅ Fetch a Single Business by ID API Call
export const getBusinessById = async (businessId: string): Promise<BusinessFetchResult> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      console.error('Missing auth token'); // ✅ Debugging log
      return { success: false, message: 'Authentication token is missing. Please log in again.' };
    }

    const response = await axiosInstance.get(`/api/business/${businessId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true, business: response.data }; // ✅ Fix: Return response.data directly
    }

    return { success: false, message: 'Failed to fetch business details.' };
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message); // ✅ Debugging log
    return { success: false, message: error.response?.data?.message || 'Unexpected error occurred.' };
  }
};


// ✅ Update Business API Call
export const updateBusiness = async (businessId: string, formData: FormData): Promise<BusinessUpdateResult> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication token is missing. Please log in again.' };
    }

    const response = await axiosInstance.put(`/api/updatebusiness/${businessId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return { success: true, message: 'Business updated successfully.' };
    }

    return { success: false, message: 'Unexpected response from the server.' };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Unexpected error occurred.' };
  }
};

// ✅ Delete Business API Call
export const deleteBusiness = async (businessId: string): Promise<{ success: boolean; message?: string }> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) {
      return { success: false, message: 'Authentication token is missing. Please log in again.' };
    }

    const response = await axiosInstance.delete(`/api/deletebusiness/${businessId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      return { success: true, message: 'Business deleted successfully.' };
    }

    return { success: false, message: 'Failed to delete business.' };
  } catch (error: any) {
    return { success: false, message: error.response?.data?.message || 'Unexpected error occurred.' };
  }
};
