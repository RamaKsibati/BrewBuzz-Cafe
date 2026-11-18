import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  style?: object;
};

export default function Button({ text, onPress, style }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 50,
    marginBottom: 15,
    marginTop: 10,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
