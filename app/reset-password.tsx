import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleReset = () => {
    setError('');
    setSuccess(false);
    if (!validateEmail(email)) {
      setError('Invalid email address.');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Top purple curve */}
      <View style={styles.topCurve} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Reset password</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password.
        </ThemedText>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholder="Email address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        {success ? (
          <ThemedText style={styles.success}>Check your email for a reset link.</ThemedText>
        ) : null}
        <TouchableOpacity
          style={[styles.button, (!email || loading) && styles.buttonDisabled]}
          onPress={handleReset}
          disabled={!email || loading}
        >
          <ThemedText style={styles.buttonText}>{loading ? 'Sending...' : 'Reset password'}</ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topCurve: {
    height: 120,
    backgroundColor: Colors.light.tint,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  content: {
    flex: 1,
    marginTop: 100,
    paddingHorizontal: 24,
    zIndex: 2,
  },
  title: {
    marginBottom: 8,
    color: Colors.light.tint,
  },
  subtitle: {
    marginBottom: 24,
    color: '#555',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF0F0',
  },
  button: {
    backgroundColor: Colors.light.tint,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    backgroundColor: '#E1CFE7',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#D32F2F',
    marginBottom: 8,
  },
  success: {
    color: '#388E3C',
    marginBottom: 8,
  },
}); 