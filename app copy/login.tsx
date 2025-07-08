import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window'); // for responsive purple card

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = email && password && validateEmail(email);

  const handleLogin = () => {
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Provide a valid email address.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError('Email/password combo is not associated with an account.');
    }, 1200);
  };

  return (
    <View style={styles.container}>
      {/* Main content */}
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back Hannah</Text>
        <Text style={styles.subtitle}>Provide your details to continue exploring</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[styles.input, error && (!email || !validateEmail(email)) ? styles.inputError : null]}
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
              style={[styles.input, styles.passwordInput, error && password ? styles.inputError : null]}
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
                color={Colors.light.tint}
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

          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>

        <TouchableOpacity
          style={[styles.button, (!isFormValid || loading || error) ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={handleLogin}
          disabled={!isFormValid || loading || !!error}
        >
          <Text style={styles.buttonText}>{isFormValid && !error ? 'Log in' : 'Continue'}</Text>
        </TouchableOpacity>

        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Don&apos;t have an account yet? </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Sign up</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      {/* Purple background card - render last so it's behind */}
      <View style={styles.topCard} />
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
    marginTop: 21,
    marginBottom: 8,
    color: '#222',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'left',
  },
  subtitle: {
    marginBottom: 28,
    color: '#444',
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'left',
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#222',
    fontWeight: '500',
    marginBottom: 6,
    marginLeft: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
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
  showHideText: {
    color: Colors.light.tint,
    fontWeight: '500',
    fontSize: 18,
  },
  forgotPasswordRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 4,
    marginBottom: 8,
  },
  forgotPasswordText: {
    color: Colors.light.tint,
    fontSize: 13,
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
    width: '100%',
  },
  buttonEnabled: {
    backgroundColor: Colors.light.tint,
  },
  buttonDisabled: {
    backgroundColor: '#C4C4C4',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#D32F2F',
    marginTop: 4,
    fontSize: 13,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  switchText: {
    color: '#222',
    fontSize: 15,
  },
  linkText: {
    color: Colors.light.tint,
    fontWeight: '500',
    fontSize: 15,
  },
});
