import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import Button from '../components/Button';
import { createBusiness } from '../api/businessApi';
import styles from '../styles/BusinessRegistrationStyles';
import { useRouter } from 'expo-router';
import Header from '../components/Header';

export default function BusinessRegistrationPage() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState('');
  const [businessLocation, setBusinessLocation] = useState('');
  const [businessDescription, setBusinessDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [merchantId, setMerchantId] = useState('');
  const [apiToken, setApiToken] = useState('');
  const [policyChecked, setPolicyChecked] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<any>(null);

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

    if (result.canceled || !result.assets || !result.assets[0]) return;

    try {
      const manipResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 800 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      setCoverPhoto(manipResult);
    } catch (error) {
      console.error('Error processing image:', error);
      Alert.alert('Error', 'Failed to process the selected image.');
    }
  };

  const handleSubmit = async () => {
    if (!policyChecked) {
      Alert.alert('Error', 'You must agree to the BrewBuzz policy to proceed.');
      return;
    }

    const formData = new FormData();
    formData.append('name', businessName);
    formData.append('location', businessLocation);
    formData.append('description', businessDescription);
    formData.append('phone_number', phoneNumber);
    formData.append('merchant_id', merchantId);
    formData.append('clover_api_token', apiToken);

    if (coverPhoto && coverPhoto.uri) {
      try {
        const localUri = coverPhoto.uri;
        const filename = localUri.split('/').pop() || 'cover_photo.jpg';
        const type = /\.(\w+)$/.exec(filename)?.[0] ? `image/${filename.split('.').pop()}` : 'image/jpeg';
        const response = await fetch(localUri);
        const blob = await response.blob();
        formData.append('cover_photo', { uri: localUri, name: filename, type } as any);
      } catch (error) {
        console.error('Error processing image upload:', error);
        Alert.alert('Error', 'Failed to upload image.');
        return;
      }
    }

    try {
      const result = await createBusiness(formData);
      if (result.success) {
        Alert.alert('Success', result.message || 'Business registered successfully!');
        router.push('/');
      } else {
        Alert.alert('Error', result.message || 'Failed to register business.');
      }
    } catch (error: any) {
      console.error('Unexpected Error:', error);
      Alert.alert('Error', error.message || 'Unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Header title="Business Registration" />
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={handleSelectPhoto}>
              <Image source={coverPhoto ? { uri: coverPhoto.uri } : require('../assets/businessprofile.png')} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.imageText}>Tap to upload a business profile picture</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Name</Text>
            <TextInput style={styles.underlineInput} value={businessName} onChangeText={setBusinessName} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Location</Text>
            <TextInput style={styles.underlineInput} value={businessLocation} onChangeText={setBusinessLocation} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Description</Text>
            <TextInput style={styles.textArea} value={businessDescription} onChangeText={setBusinessDescription} multiline onSubmitEditing={() => Keyboard.dismiss()} blurOnSubmit={true} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Business Phone Number</Text>
            <TextInput style={styles.underlineInput} value={phoneNumber} onChangeText={setPhoneNumber} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>Merchant ID</Text>
            <TextInput style={styles.inputBox} value={merchantId} onChangeText={setMerchantId} />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldTitle}>API Token</Text>
            <TextInput style={styles.inputBox} value={apiToken} onChangeText={setApiToken} />
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
            <Button text="Submit" onPress={handleSubmit} style={[styles.button, { width: wp('50%') }]} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}