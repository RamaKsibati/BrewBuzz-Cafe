import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import styles from '../../styles/CartScreenStyles';
import Button from '../../components/Button';
import Header from '../../components/Header';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  shopName: string;
  shopAddress: string;
}

interface BusinessGroup {
  shopName: string;
  shopAddress: string;
  items: CartItem[];
  total: number;
}

const CartScreen = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [businessGroups, setBusinessGroups] = useState<BusinessGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const parsedCart: CartItem[] = JSON.parse(storedCart);
        setCartItems(parsedCart);
        groupItemsByBusiness(parsedCart);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const groupItemsByBusiness = (items: CartItem[]) => {
    const groupedItems = items.reduce<{ [key: string]: BusinessGroup }>((acc, item) => {
      const key = `${item.shopName}-${item.shopAddress}`;
      if (!acc[key]) {
        acc[key] = {
          shopName: item.shopName,
          shopAddress: item.shopAddress,
          items: [],
          total: 0,
        };
      }
      acc[key].items.push(item);
      acc[key].total += item.price * item.quantity;
      return acc;
    }, {});

    setBusinessGroups(Object.values(groupedItems));
  };

  const removeFromCart = async (itemId: string) => {
    try {
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      groupItemsByBusiness(updatedCart);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          onPress: async () => {
            await AsyncStorage.removeItem('cart');
            setCartItems([]);
            setBusinessGroups([]);
            Alert.alert('Cart Cleared', 'Your cart has been emptied.');
          },
        },
      ]
    );
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const updatedCart = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      groupItemsByBusiness(updatedCart);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleOrder = (shopName: string, shopAddress: string) => {
    Alert.alert(
      'Place Order',
      `Order from ${shopName}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Order',
          onPress: async () => {
            try {
              Alert.alert('Order Placed', `Order from ${shopName} confirmed!`);
              const updatedCart = cartItems.filter(item => item.shopName !== shopName);
              setCartItems(updatedCart);
              setBusinessGroups(businessGroups.filter(group => group.shopName !== shopName));
              updatedCart.length > 0
                ? await AsyncStorage.setItem('cart', JSON.stringify(updatedCart))
                : await AsyncStorage.removeItem('cart');
            } catch (error) {
              console.error('Order error:', error);
            }
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#C67C4E" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Cart" />

      {businessGroups.length === 0 ? (
          <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
        </View>
    ) : (
        <FlatList
          data={businessGroups}
          keyExtractor={group => `${group.shopName}-${group.shopAddress}`}
          renderItem={({ item: group }) => (
            <View style={styles.businessGroup}>
              <View style={styles.shopInfo}>
                <Text style={styles.shopName}>{group.shopName}</Text>
                <Text style={styles.shopAddress}>{group.shopAddress}</Text>
              </View>

              {group.items.map(item => (
                <View key={item.id} style={styles.cartItem}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                    <View style={styles.quantityAndRemoveContainer}>
                      <View style={styles.quantityContainer}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                          style={styles.quantityButton}
                        >
                          <Text style={styles.quantityText}>-</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityNumber}>{item.quantity}</Text>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                          style={styles.quantityButton}
                        >
                          <Text style={styles.quantityText}>+</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.id)}
                        style={styles.removeTextContainer}
                      >
                        <Text style={styles.removeButtonText}>Remove</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}

              <View style={styles.businessGroupFooter}>
                <Text style={styles.totalPrice}>Total: ${group.total.toFixed(2)}</Text>
                <Button
                  text="Order"
                  onPress={() => handleOrder(group.shopName, group.shopAddress)}
                  style={styles.orderButton}
                />
              </View>
            </View>
          )}
          ListFooterComponent={
            businessGroups.length > 0 ? (
              <View style={styles.clearButtonContainer}>
                <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
                  <Text style={styles.clearButtonText}>Clear Cart</Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default CartScreen;