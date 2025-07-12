import { TopAlert } from '@/components/TopAlert';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    // setError('');
    // setSuccess(false);
    // if (!password || !confirmPassword) {
    //   showAlert('Please fill in all fields.', 'error');
    //   return;
    // }
    // if (password.length < 6) {
    //   showAlert('Password must be at least 6 characters.', 'error');
    //   return;
    // }
    // if (password !== confirmPassword) {
    //   showAlert('Passwords do not match.', 'error');
    //   return;
    // }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showAlert('Password reset successful!', 'success');
      setSuccess(true);

      // Wait for the alert to display before redirecting
      setTimeout(() => {
        router.push('/login');
      }, 1500); // delay navigation by 1.5 seconds
    }, 1200);

    
  };

  return (
    <>
    <Stack.Screen options={{ headerShown: false }} />
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
      <View style={styles.container}>
        <TopAlert message={alert.message} type={alert.type} visible={alert.visible} />
        <KeyboardAwareScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
          enableAutomaticScroll
          extraScrollHeight={40}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        >
          {/* Back Button */}
          <TouchableOpacity
              onPress={() =>  router.push('/verify-reset-code')}
              style={styles.backButton}
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
            >
              <Ionicons name="arrow-back" size={24} color="#222" />
            </TouchableOpacity>
          
          <View style={styles.contentWrapper}>
            <Text style={styles.title}>Create new password</Text>
            <Text style={styles.subtitle}>
              Your new password must be different from previous passwords.
            </Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputPasswordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    password ? { backgroundColor: '#EDE8ED' } : { backgroundColor: '#FFFFFF' },
                    error && password ? styles.inputError : null,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showHideBtn}>
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Confirm Password</Text>
              <View style={styles.inputPasswordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    confirmPassword ? { backgroundColor: '#EDE8ED' } : { backgroundColor: '#FFFFFF' },
                    error && confirmPassword ? styles.inputError : null,
                  ]}
                  placeholder="Confirm Password"
                  placeholderTextColor="#aaa"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.showHideBtn}>
                  <Ionicons
                    name={showConfirmPassword ? 'eye' : 'eye-off'}
                    size={18}
                    color="#6B7280"
                  />
                </TouchableOpacity>
              </View>
            </View>
            
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            
            <TouchableOpacity
              style={[styles.button, styles.buttonEnabled]}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>Reset password</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: Math.max(40, Math.round(Dimensions.get('window').height * 0.07)),
    marginTop: 23,
  },
  backButton: {
    position: 'absolute',
    top: Math.max(48, Math.round(Dimensions.get('window').height * 0.06)),
    left: 23,
    zIndex: 2,
  },
  contentWrapper: {
    paddingTop: Math.max(80, Math.round(Dimensions.get('window').height * 0.12)),
  },
  title: {
    marginBottom: 8,
    color: '#222',
    fontSize: 24,
    fontWeight: '700',
    fontFamily: 'Lato-Bold',
    letterSpacing: 0.2,
    textAlign: 'left',
  },
  subtitle: {
    marginBottom: 32,
    color: '#555',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.1,
    textAlign: 'left',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.1,
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.1,
    color: '#222',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FDECEC',
  },
  inputPasswordWrapper: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    paddingRight: 40,
  },
  showHideBtn: {
    position: 'absolute',
    right: 8,
    top: 0,
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  errorText: {
    color: '#D32F2F',
    marginBottom: 16,
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.1,
    textAlign: 'left',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    width: '100%',
  },
  buttonEnabled: {
    backgroundColor: '#4A154B',
  },
  buttonDisabled: {
    backgroundColor: '#B4B4B4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    letterSpacing: 0.2,
  },
}); 