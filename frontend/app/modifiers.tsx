import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/ModifiersScreenStyles';

type Modifier = { id: string; name: string; price: number };
type ModifierGroup = { groupId: string; groupName: string; options: Modifier[] };
type MenuItem = { 
  id: string; 
  name: string; 
  price: number; 
  image: string; 
  category: string; 
  modifiers: ModifierGroup[] 
};

export default function ModifiersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    item: string;
    noModifiers?: string;
    shopName: string;
    shopAddress: string;
  }>();
  
  const item = JSON.parse(params.item) as MenuItem;
  const noModifiers = params.noModifiers === 'true';
  const { shopName, shopAddress } = params;

  const [selectedModifiers, setSelectedModifiers] = useState<{ [key: string]: Modifier[] }>({});
  const [additionalRequests, setAdditionalRequests] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const additionalRequestsRef = useRef<View>(null);
  const [additionalRequestsY, setAdditionalRequestsY] = useState(0);

  const totalPrice = item.price + Object.values(selectedModifiers).flat().reduce((sum, mod) => sum + mod.price, 0);

  const handleModifierSelection = (groupId: string, option: Modifier) => {
    setSelectedModifiers(prev => ({
      ...prev,
      [groupId]: prev[groupId]?.some(mod => mod.id === option.id)
        ? prev[groupId].filter(mod => mod.id !== option.id)
        : [...(prev[groupId] || []), option]
    }));
  };

  const handleAddToCart = async () => {
    try {
      const currentCart = JSON.parse(await AsyncStorage.getItem('cart') || '[]');
      const newCartItem = {
        id: item.id,
        name: item.name,
        price: totalPrice,
        quantity: 1,
        modifiers: selectedModifiers,
        additionalRequests,
        shopName,
        shopAddress,
      };
      
      await AsyncStorage.setItem('cart', JSON.stringify([...currentCart, newCartItem]));
      Alert.alert('Success', 'Item added to cart!');
      router.back();
    } catch (error) {
      console.error('Cart update error:', error);
      Alert.alert('Error', 'Failed to add item to cart');
    }
  };

  const measurePosition = () => {
    additionalRequestsRef.current?.measureInWindow((_, y) => setAdditionalRequestsY(y));
  };

  useEffect(() => {
    const keyboardShow = Keyboard.addListener('keyboardDidShow', (event) => {
      const scrollPosition = additionalRequestsY - (event.endCoordinates.screenY - event.endCoordinates.height);
      if (scrollPosition > 0) scrollViewRef.current?.scrollTo({ y: scrollPosition, animated: true });
    });

    const keyboardHide = Keyboard.addListener('keyboardDidHide', () => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    });

    return () => {
      keyboardShow.remove();
      keyboardHide.remove();
    };
  }, [additionalRequestsY]);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <TouchableOpacity onPress={router.back} style={styles.backButton}>
              <Image 
                source={require('../assets/BackArrow.png')} 
                style={[styles.backIcon, { width: wp(6), height: wp(6) }]} 
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Customize Your Item</Text>
          </View>

          <Text style={styles.itemName}>{item.name}</Text>

          {!noModifiers && item.modifiers.map(group => (
            <View key={group.groupId} style={styles.modifierGroup}>
              <Text style={styles.groupName}>{group.groupName}</Text>
              {group.options.map(option => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.modifierOption,
                    selectedModifiers[group.groupId]?.some(m => m.id === option.id) && styles.selectedModifierOption
                  ]}
                  onPress={() => handleModifierSelection(group.groupId, option)}
                >
                  <Text style={styles.optionName}>{option.name}</Text>
                  <Text style={styles.optionPrice}>+${option.price.toFixed(2)}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}

          <View 
            ref={additionalRequestsRef} 
            onLayout={measurePosition}
            style={styles.additionalRequestsContainer}
          >
            <Text style={styles.additionalRequestsLabel}>Additional Requests</Text>
            <TextInput
              style={styles.additionalRequestsInput}
              placeholder="Enter any special requests or comments..."
              placeholderTextColor="#888"
              multiline
              numberOfLines={4}
              value={additionalRequests}
              onChangeText={setAdditionalRequests}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.totalPriceText}>Total: ${totalPrice.toFixed(2)}</Text>
          <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
            <Text style={styles.addToCartButtonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}