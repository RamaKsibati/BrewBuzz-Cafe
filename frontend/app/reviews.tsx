import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter, useFocusEffect } from 'expo-router';
import axiosInstance from '../service/axiosInstance';
import styles from '../styles/ReviewPageStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header'; // Import Header

interface Review {
  id: string;
  rating: number;
  review: string;
  createdAt: string;
  User?: User;
}

interface User {
  id: string;
  full_name: string;
  profilePic?: string;
}

const ReviewPage = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const shopId = params.shopId as string;
  const shopName = params.shopName as string;
  
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(0);
  const [ratingDistribution, setRatingDistribution] = useState<number[]>([0, 0, 0, 0, 0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const fetchUser = useCallback(async () => {
    const token = await AsyncStorage.getItem('authToken');
    if (!token) return;

    const response = await axiosInstance.get('/api/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      setCurrentUser(response.data);
    }
  }, []);

  const fetchReviews = useCallback(async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await axiosInstance.get(
        `/api/businesses/${shopId}/reviews`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data.reviews) {
        setReviews(response.data.reviews as Review[]);
        setAverageRating(response.data.averageRating);
        calculateRatingDistribution(response.data.reviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useFocusEffect(
    useCallback(() => {
      fetchUser();
      fetchReviews();
    }, [fetchUser, fetchReviews])
  );

  const calculateRatingDistribution = (reviews: Review[]) => {
    const counts = [0, 0, 0, 0, 0];
    reviews.forEach((review) => {
      counts[review.rating - 1] += 1;
    });
    setRatingDistribution(counts);
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) {
        Alert.alert('Session Expired', 'Please log in again.');
        router.replace('/login');
        return;
      }

      const response = await axiosInstance.delete(`/api/reviews/${reviewId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Alert.alert('Deleted', 'Your review has been removed.');
        fetchReviews();
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      Alert.alert('Error', 'Failed to delete review.');
    }
  };

  const postReview = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (!token) throw new Error('Authentication token not found');

      const response = await axiosInstance.post(
        `/api/businesses/${shopId}/reviews`,
        { rating: newRating, review: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201 || response.status === 200) {
        Alert.alert('Success', 'Your review has been posted!');
        setModalVisible(false);
        setNewComment('');
        fetchReviews();
      }
    } catch (error) {
      console.error('Error posting review:', error);
      Alert.alert('Error', 'Could not submit your review.');
    }
  };

  const renderStars = (rating: number) => (
    <Text style={styles.starText}>
      {'★'.repeat(rating) + '☆'.repeat(5 - rating)}
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`Reviews`} showBackButton={true} onBack={() => router.back()} />

      <View style={styles.ratingContainer}>
        <Text style={styles.averageRating}>{averageRating.toFixed(1)}</Text>
        {renderStars(Math.round(averageRating))}
      </View>

      <View style={styles.ratingBreakdown}>
        {[5, 4, 3, 2, 1].map((star) => (
          <View key={star} style={styles.ratingRow}>
            <Text style={styles.ratingText}>{star} ★</Text>
            <View style={styles.ratingBar}>
              <View
                style={[
                  styles.ratingFill,
                  { width: `${(ratingDistribution[star - 1] / reviews.length) * 100}%` },
                ]}
              />
            </View>
          </View>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.reviewList}>
        {loading ? (
          <ActivityIndicator size="large" color="#E27D19" />
        ) : reviews.length === 0 ? (
          <Text style={styles.noReviewsText}>No reviews yet!</Text>
        ) : (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <Image
                source={{ uri: review.User?.profilePic || 'https://via.placeholder.com/40' }}
                style={styles.userImage}
              />
              <View style={styles.reviewContent}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.userName}>
                    {review.User?.full_name || 'Unknown User'}
                  </Text>
                  {renderStars(review.rating)}
                </View>
                <Text style={styles.reviewText}>{review.review}</Text>
                {review.User?.id === currentUser?.id && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteReview(review.id)}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.leaveReviewButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.leaveReviewText}>Leave a Review</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Leave a Review</Text>
            <View style={styles.starSelection}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setNewRating(star)}
                  style={styles.starButton}
                >
                  <Text
                    style={[
                      styles.modalStar,
                      { color: star <= newRating ? '#C67C4E' : '#A0A0A0' },
                    ]}
                  >
                    {star <= newRating ? '★' : '☆'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="Write your review..."
              placeholderTextColor="#888"
              value={newComment}
              onChangeText={setNewComment}
              multiline
              numberOfLines={4}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.submitButton} onPress={postReview}>
                <Text style={styles.submitText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReviewPage;