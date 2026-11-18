import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Button from '../components/Button';
import { getBusinessById, updateBusiness, deleteBusiness } from '../api/businessApi';
import styles from '../styles/EditBusinessStyles';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Header from '../components/Header'; // Import Header

export default function EditBusinessScreen() {
  const { businessId: businessIdParam } = useLocalSearchParams();
  const router = useRouter();
  const [businessId, setBusinessId] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [coverPhoto, setCoverPhoto] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isMerchantIdChanged, setIsMerchantIdChanged] = useState(false);
  const [isApiTokenChanged, setIsApiTokenChanged] = useState(false);
  const [policyChecked, setPolicyChecked] = useState(false);

  useEffect(() => {
    if (businessIdParam) {
      setBusinessId(Array.isArray(businessIdParam) ? businessIdParam[0] : businessIdParam);
    }
  }, [businessIdParam]);

  useEffect(() => {
    if (businessId) {
      const fetchBusinessData = async () => {
        setLoading(true);
        try {
          const businessData = await getBusinessById(businessId);
          if (businessData.success && businessData.business) {
            const {
              name,
              location,
              description,
              phone_number,
              cover_photo,
              merchant_id,
              clover_api_token,
            } = businessData.business;
            setBusinessName(name || '');
            setBusinessLocation(location || '');
            setBusinessDescription(description || '');
            setPhoneNumber(phone_number || '');
            setCoverPhoto(cover_photo ? { uri: cover_photo } : null);
            setMerchantId(merchant_id || '');
            setApiToken(clover_api_token || '');
          } else {
            Alert.alert('Error', businessData.message || 'Failed to fetch business data.');
          }
        } catch (error) {
          console.error('Error fetching business data:', error);
          Alert.alert('Error', 'An unexpected error occurred.');
        } finally {
          setLoading(false);
        }
      };
      fetchBusinessData();
    }
  }, [businessId]);

  const handleSelectPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant photo library permissions.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const { uri } = result.assets[0];
      try {
        const processedImage = await ImageManipulator.manipulateAsync(
          uri,
          [{ resize: { width: 800 } }],
          { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
        );
        setCoverPhoto(processedImage);
      } catch (error) {
        console.error('Error processing image:', error);
        Alert.alert('Error', 'Failed to process image.');
      }
    }
  };

  const handleUpdateBusiness = async () => {
    if (!businessName || !businessLocation || !businessDescription || !phoneNumber) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }
    if (!policyChecked) {
      Alert.alert('Error', 'Please agree to the BrewBuzz policy.');
      return;
    }

    const formData = new FormData();
    formData.append('name', businessName);
    formData.append('location', businessLocation);
    formData.append('description', businessDescription);
    formData.append('phone_number', phoneNumber);

    if (isMerchantIdChanged) formData.append('merchant_id', merchantId);
    if (isApiTokenChanged) formData.append('clover_api_token', apiToken);

    if (coverPhoto && coverPhoto.uri) {
      const localUri = coverPhoto.uri;
      const filename = localUri.split('/').pop() || 'cover_photo.jpg';
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('cover_photo', {
        uri: localUri,
        name: filename,
        type,
      } as any);
    }

    try {
      const updateResult = await updateBusiness(businessId!, formData);
      if (updateResult.success) {
        Alert.alert('Success', 'Business updated successfully!');
        router.back();
      } else {
        Alert.alert('Error', updateResult.message || 'Failed to update business.');
      }
    } catch (error) {
      console.error('Error updating business:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    }
  };

  const handleDeleteBusiness = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this business? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const deleteResult = await deleteBusiness(businessId!);
              if (deleteResult.success) {
                Alert.alert('Deleted', 'Business deleted successfully.');
                router.back();
              } else {
                Alert.alert('Error', deleteResult.message || 'Failed to delete business.');
              }
            } catch (error) {
              console.error('Error deleting business:', error);
              Alert.alert('Error', 'An unexpected error occurred.');
            }
          },
        },
      ]
    );
  };

  const handleFieldChangeConfirmation = (field: 'merchantId' | 'apiToken') => {
    Alert.alert(
      'Confirm Change',
      `Are you sure you want to change your ${field === 'merchantId' ? 'Merchant ID' : 'API Token'}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            if (field === 'merchantId') setIsMerchantIdChanged(true);
            else setIsApiTokenChanged(true);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Header title="Edit Business" showBackButton={true} onBack={() => router.back()} />

          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleSelectPhoto}>
              <Image
                source={coverPhoto ? { uri: coverPhoto.uri } : require('../assets/businessprofile.png')}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.imageText}>Tap to upload a business profile picture</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Name</Text>
            <TextInput
              style={styles.underlineInput}
              value={businessName}
              onChangeText={setBusinessName}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Location</Text>
            <TextInput
              style={styles.underlineInput}
              value={businessLocation}
              onChangeText={setBusinessLocation}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Description</Text>
            <TextInput
              style={styles.textArea}
              value={businessDescription}
              onChangeText={setBusinessDescription}
              multiline
              onSubmitEditing={() => Keyboard.dismiss()}
              blurOnSubmit={true}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Phone Number</Text>
            <TextInput
              style={styles.underlineInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Merchant ID</Text>
            <TouchableOpacity onPress={() => handleFieldChangeConfirmation('merchantId')}>
              {isMerchantIdChanged ? (
                <TextInput
                  style={styles.inputBox}
                  value={merchantId}
                  onChangeText={setMerchantId}
                  placeholder="Enter new Merchant ID"
                />
              ) : (
                <Text style={styles.tapToChangeText}>Tap to change Merchant ID or leave as is</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>API Token</Text>
            <TouchableOpacity onPress={() => handleFieldChangeConfirmation('apiToken')}>
              {isApiTokenChanged ? (
                <TextInput
                  style={styles.inputBox}
                  value={apiToken}
                  onChangeText={setApiToken}
                  placeholder="Enter new API Token"
                />
              ) : (
                <Text style={styles.tapToChangeText}>Tap to change API Token or leave as is</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.policyContainer}>
            <TouchableOpacity style={styles.checkbox} onPress={() => setPolicyChecked(!policyChecked)}>
              {policyChecked && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.policyText}>
              I agree to the <Text style={styles.policyLink}>BrewBuzz policy</Text>.
            </Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Button text="Submit" onPress={handleUpdateBusiness} style={[styles.button, { width: wp('50%') }]} />
          </View>

          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Pressable onPress={handleDeleteBusiness}>
              <Text style={styles.deleteText}>Delete Business</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}