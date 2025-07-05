import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TopAlertProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

export const TopAlert: React.FC<TopAlertProps> = ({ message, type, visible }) => {
  if (!visible) return null;
  return (
    <View style={[styles.alert, type === 'success' ? styles.success : styles.error]}>
      <Text style={[styles.text, type === 'success' ? styles.successText : styles.errorText]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    marginHorizontal: 24,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    zIndex: 10,
  },
  success: {
    backgroundColor: '#E6F4EA',
    borderColor: '#388E3C',
  },
  error: {
    backgroundColor: '#FDECEA',
    borderColor: '#D32F2F',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  successText: {
    color: '#388E3C',
  },
  errorText: {
    color: '#D32F2F',
  },
}); 