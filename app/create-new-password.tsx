import { ThemedText } from '@/components/ThemedText';
import { TopAlert } from '@/components/TopAlert';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function CreateNewPasswordScreen() {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false });

  const isFormValid = password && confirmPassword && password.length >= 6 && password === confirmPassword;

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setAlert({ message, type, visible: true });
    setTimeout(() => setAlert((a) => ({ ...a, visible: false })), 1800);
  };

  const handleReset = () => {
    setError('');
    setSuccess(false);
    if (!password || !confirmPassword) {
      showAlert('Please fill in all fields.', 'error');
      return;
    }
    if (password.length < 6) {
      showAlert('Password must be at least 6 characters.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      showAlert('Passwords do not match.', 'error');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showAlert('Password reset successful!', 'success');
      setSuccess(true);
    }, 1200);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCard} />
      <TopAlert message={alert.message} type={alert.type} visible={alert.visible} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Create new password</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your new password must be different from previous passwords.
        </ThemedText>
        <TextInput
          style={[styles.input, error && password ? styles.inputError : null]}
          placeholder="Password"
          placeholderTextColor="#aaa"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showHideBtn}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#4A154B"
          />
        </TouchableOpacity>
        <TextInput
          style={[styles.input, error && confirmPassword ? styles.inputError : null]}
          placeholder="Confirm Password"
          placeholderTextColor="#aaa"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={!showConfirmPassword}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.showHideBtn2}>
          <Ionicons
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={22}
            color="#4A154B"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!isFormValid || loading) && styles.buttonDisabled]}
          onPress={handleReset}
          disabled={!isFormValid || loading}
        >
          <ThemedText style={styles.buttonText}>{loading ? 'Resetting...' : 'Reset password'}</ThemedText>
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
    color: '#222',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
  },
  subtitle: {
    marginBottom: 24,
    color: '#555',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
  },
  input: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#222',
    marginBottom: 12,
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF0F0',
  },
  showHideBtn: {
    position: 'absolute',
    right: 8,
    top: 14,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  showHideBtn2: {
    position: 'absolute',
    right: 8,
    top: 74,
    height: 48,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  button: {
    backgroundColor: '#4A154B',
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
}); 