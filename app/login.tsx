import { TopAlert } from '@/components/TopAlert';
import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
 const router = useRouter();

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const validatePassword = (password: string) =>
    password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);

  const isFormValid =
    !!email && !!password && validateEmail(email) && validatePassword(password);

  const handleLogin = () => {
    setError('');
    if (!email) return setError('Email is required.');
    if (!validateEmail(email)) return setError('Provide a valid email address.');
    if (!password) return setError('Password is required.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))
      return setError('Password must contain at least one letter and one number.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Email/password combo is not associated with an account.');
    }, 2000);
  };

  useEffect(() => {
    if (isFormValid && error) {
      const timeout = setTimeout(() => setError(''), 2000);
      return () => clearTimeout(timeout);
    }
  }, [isFormValid, error]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <View style={styles.container}>
          <TopAlert message={error} type="error" visible={!!error} />

          <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            enableAutomaticScroll
            extraScrollHeight={Platform.OS === 'ios' ? 40 : 80}
            showsVerticalScrollIndicator={false}
          >
            {/* SVG Background - part of layout flow */}
            <Svg
              width={width * 1.7}
              height={width * 1.2}
              viewBox={`0 0 ${width * 1.7} ${width * 1.2}`}
              style={styles.svg}
            >
              <Path
                d={`M0,0 Q${(width * 1.4) / 2},${width * 1.2} ${width * 1.7},0 L${width * 1.7},0 L0,0 Z`}
                fill="#4A154B"
              />
            </Svg>

            {/* <TouchableOpacity
                onPress={() => router.back()}
                style={{ position: 'absolute', top: 100, left: 20, zIndex: 2 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
            <Ionicons name="arrow-back" size={19} color="#fff" />
          </TouchableOpacity> */}

            <Text style={styles.title}>{'Welcome back\nHannah'}</Text>
            <Text style={styles.subtitle}>Provide your details to continue exploring</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor:
                      error && (!email || !validateEmail(email))
                        ? '#FDECEC'
                        : email
                          ? '#EDE8ED'
                          : '#FFFFFF',
                  },
                  error && (!email || !validateEmail(email)) ? styles.inputError : null,
                ]}
                placeholder="Provide valid email address"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputPasswordWrapper}>
                <TextInput
                  style={[
                    styles.input,
                    styles.passwordInput,
                    {
                      backgroundColor:
                        error && password
                          ? '#FDECEC'
                          : password
                            ? '#EDE8ED'
                            : '#FFFFFF',
                    },
                    error && password ? styles.inputError : null,
                  ]}
                  placeholder="Password"
                  placeholderTextColor="#aaa"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.showHideBtn}
                >
                  <Ionicons
                    name={showPassword ? 'eye' : 'eye-off'}
                    size={18}
                    color={'#6B7280'}
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.forgotPasswordRow}>
                <Link href="/reset-password" asChild>
                  <TouchableOpacity>
                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                  </TouchableOpacity>
                </Link>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                !isFormValid || loading ? styles.buttonDisabled : styles.buttonEnabled,
              ]}
              onPress={handleLogin}
              disabled={!isFormValid || loading}
            >
              <Text style={styles.buttonText}>
                {isFormValid && !error ? 'Log in' : 'Continue'}
              </Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
              <Text style={styles.switchText}>Don&apos;t have an account yet? </Text>
              <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.linkText}>Sign up</Text>
                </TouchableOpacity>
              </Link>
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
    position: 'relative',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  svg: {
    alignSelf: 'flex-start',
    marginTop: 0,
    marginBottom: -179, // Push content up under the curve
    marginLeft: -(width * 0.35),
  },
  title: {
    marginTop: 24,
    marginBottom: 8,
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'left',
  },
  subtitle: {
    marginBottom: 24,
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 11,
  },
  inputLabel: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '400',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#222',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF0F0',
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
  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: '#6366F1',
    fontSize: 12,
    fontWeight: '500',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonEnabled: {
    backgroundColor: '#4A154B',
  },
  buttonDisabled: {
    backgroundColor: '#C4C4C4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  switchText: {
    color: '#222',
    fontSize: 15,
  },
  linkText: {
    color: '#6366F1',
    fontWeight: '400',
    fontSize: 14,
  },
});