import { ThemedText } from '@/components/ThemedText';
import { TopAlert } from '@/components/TopAlert';
import { Colors } from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false });
  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const showAlert = (message: string, type: 'success' | 'error' = 'success', cb?: () => void) => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert((a) => ({ ...a, visible: false }));
      if (cb) cb();
    }, 1800);
  };

  const handleReset = () => {
    setError('');
    setSuccess(false);
    if (!validateEmail(email)) {
      showAlert('Invalid email address.', 'error');
      return;
    }
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      showAlert('Reset link sent successfully!', 'success', () => {
        router.push({ pathname: '/verify-reset-code', params: { email } });
      });
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCard} />
      <TopAlert message={alert.message} type={alert.type} visible={alert.visible} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Reset password</ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your email and we'll send you a link to reset your password.
        </ThemedText>
        <TextInput
          style={[styles.input, alert.visible && alert.type === 'error' ? styles.inputError : null]}
          placeholder="Email address"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
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
  topCard: {
    position: 'absolute',
    top: -width * 0.8,
    left: -width * 0.25,
    width: width * 1.5,
    height: width * 1.5,
    backgroundColor: '#4A154B',
    borderRadius: width * 0.75,
    zIndex: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: width * 0.75,
    paddingHorizontal: 24,
    zIndex: 1,
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
  topAlert: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    backgroundColor: '#E6F4EA',
    borderColor: '#388E3C',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 24,
    padding: 12,
    zIndex: 10,
    alignItems: 'center',
  },
  topAlertText: {
    color: '#388E3C',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 