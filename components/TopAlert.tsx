import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface TopAlertProps {
  message: string;
  type: 'success' | 'error';
  visible: boolean;
}

export const TopAlert: React.FC<TopAlertProps> = ({ message, type, visible }) => {
  if (!visible) return null;

  const iconName = type === 'error' ? 'alert-octagon-outline' : 'check-circle-outline';
  const iconColor = type === 'error' ? '#D32F2F' : '#388E3C';

  return (
    <View style={[
      styles.alert,
      type === 'error' ? styles.error : styles.success
    ]}>
      <MaterialCommunityIcons
        name={iconName}
        size={20}
        color={iconColor}
        style={{ marginRight: 8 }}
      />
      <Text style={[
        styles.text,
        type === 'error' ? styles.errorText : styles.successText
      ]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    marginHorizontal: 24,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  error: {
    borderBottomWidth: 4,
    borderBottomColor: '#D32F2F',
  },
  success: {
    borderBottomWidth: 4,
    borderBottomColor: '#388E3C',
  },
  text: {
    fontWeight: '400',
    fontSize: 14,
    flex: 1,
  },
  errorText: {
    color: '#000000',
  },
  successText: {
    color: '#388E3C',
  },
});
