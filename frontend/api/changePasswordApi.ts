
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../service/axiosInstance';


export interface ChangePasswordResult {
    success: boolean;
    message?: string;
}


export const changePassword = async (
    oldPassword: string,
    newPassword: string, 
    confirmNewPassword: string
    ): Promise<ChangePasswordResult> => {
    try{
        const token = await AsyncStorage.getItem('authToken');
        
        if (!token){
            return {success: false, message: 'Authentication token is missing. Please log in again.'};
        }

        const response = await axiosInstance.post('/api/change-password',
            {oldPassword, newPassword, confirmNewPassword},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
        );


        return {
            success: true,
             message: response.data.message
            };
        
    } catch (error: any) {
        return {
            success: false, 
            message: error.response?.data?.message || 'Unexpected error occured',
                };
    }



    };






