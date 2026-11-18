import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
  Modal,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/CreateAccountScreenStyles';
import { handleCreateAccount } from '../api/authApi';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

export default function CreateAccountScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isBusiness, setIsBusiness] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const onCreateAccount = async () => {
    if (!isPolicyChecked) {
      Alert.alert('Error', 'You must agree to the policy before creating an account.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    const userCategory = isBusiness ? 'Business' : 'Customer';
    const result = await handleCreateAccount(
      fullName,
      email,
      password,
      selectedState,
      zipcode,
      userCategory
    );

    if (result.success) {
      Alert.alert('Success', result.message || 'Account created successfully!', [{
        text: 'OK',
        onPress: () => router.push('/login')
      }]);
    } else {
      Alert.alert('Error', result.message || 'Unable to create account.');
    }
  };

  return (
<View style={[styles.fullScreenContainer, isBusiness ? styles.businessBackground : styles.customerBackground]}>
      {/* Hide status bar (optional) */}
      <StatusBar hidden={true} />
            <Image source={require('../assets/logo.png')} style={styles.logo} />

      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !isBusiness && styles.activeButton]}
          onPress={() => setIsBusiness(false)}
        >
          <Text style={[styles.toggleText, !isBusiness && styles.activeText]}>Customer</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, isBusiness && styles.activeButton]}
          onPress={() => setIsBusiness(true)}
        >
          <Text style={[styles.toggleText, isBusiness && styles.activeText]}>Business</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {[{ label: 'Password', value: password, onChange: setPassword },
        { label: 'Confirm Password', value: confirmPassword, onChange: setConfirmPassword }]
        .map(({ label, value, onChange }, index) => (
          <View key={index} style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder={label}
              secureTextEntry
              value={value}
              onChangeText={onChange}
            />
          </View>
      ))}

      <View style={styles.row}>
        <Pressable
          style={[styles.fakeTextField, styles.wideInput]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={[styles.selectedStateText, selectedState && { color: '#000' }]}>
          {selectedState || 'Select a State'}</Text>
        </Pressable>

        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="Zipcode"
          value={zipcode}
          onChangeText={setZipcode}
        />
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose a State</Text>
            <ScrollView style={styles.stateList}>
              {US_STATES.map((state) => (
                <Pressable key={state} style={styles.stateItem} onPress={() => { 
                  setSelectedState(state); 
                  setModalVisible(false); 
                }}>
                  <Text style={styles.stateText}>{state}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>

      <View style={styles.checkboxContainer}>
        <Pressable
          style={styles.checkbox}
          onPress={() => setIsPolicyChecked(!isPolicyChecked)}
        >
          {isPolicyChecked && <Text style={styles.checkmark}>✓</Text>}
        </Pressable>
        <Text style={styles.policyText}>I agree to the BrewBuzz Customer policy.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onCreateAccount}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{' '}
        <Text
          style={[styles.signInText, { textDecorationLine: 'underline' }]}
          onPress={() => router.push('/login')}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
}