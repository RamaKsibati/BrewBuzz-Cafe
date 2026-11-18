import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { fetchUserBusinesses } from '../../api/businessApi';
import styles from '../../styles/BusinessPageStyles';
import Header from '../../components/Header'; // Import the Header component

interface Business {
  id: string;
  name: string;
  location: string;
  description?: string;
  phone_number?: string;
  merchant_id?: string;
  clover_api_token?: string;
  cover_photo?: string;
}

const BusinessPage = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadBusinesses = async () => {
      setLoading(true);
      try {
        const result = await fetchUserBusinesses();
        if (result.success && result.businesses) {
          setBusinesses(result.businesses);
        } else {
          Alert.alert('Error', result.message || 'Failed to fetch businesses.');
        }
      } catch (error) {
        console.error('Error fetching businesses:', error);
        Alert.alert('Error', 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    loadBusinesses();
  }, []);

  const renderBusinessCards = () => {
    return businesses.map((business) => (
      <TouchableOpacity
        key={business.id}
        style={styles.businessCard}
        onPress={() => router.push({ pathname: '/edit-business', params: { businessId: business.id } })}
      >
        <Image source={{ uri: business.cover_photo }} style={styles.businessImage} />
        <View style={styles.overlay}>
          <Text style={styles.businessName}>{business.name}</Text>
          <Text style={styles.businessAddress}>{business.location}</Text>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Business" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderBusinessCards()}
        <TouchableOpacity onPress={() => router.push('/business-registration')}>
          <Text style={styles.addBusinessText}>Add Another Business</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BusinessPage;