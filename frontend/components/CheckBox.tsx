import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

type CheckBoxProps = {
  value: boolean; // Whether the checkbox is checked
  onValueChange: (newValue: boolean) => void; // Callback for when the checkbox is toggled
  label?: string; // Optional label to display next to the checkbox
};

const CheckBox: React.FC<CheckBoxProps> = ({ value, onValueChange, label }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onValueChange(!value)}
      activeOpacity={0.7}
    >
      {/* CheckBox Square */}
      <View style={[styles.checkbox, value && styles.checkboxChecked]}>
        {value && <Text style={styles.checkmark}>✓</Text>}
      </View>

      {/* Optional Label */}
      {label && <Text style={styles.label}>{label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  checkboxChecked: {
    backgroundColor: '#FF8C00',
    borderColor: '#FF8C00',
  },
  checkmark: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default CheckBox;
