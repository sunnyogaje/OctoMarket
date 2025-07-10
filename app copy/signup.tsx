import { TopAlert } from '@/components/TopAlert';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const PURPLE = '#4A154B';

export default function SignUpScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [referralFocused, setReferralFocused] = useState(false);
  const [birthdayFocused, setBirthdayFocused] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false });

  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  const isFormValid = fullName && email && password && confirmPassword && validateEmail(email) && password.length >= 6 && password === confirmPassword && birthday;

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setAlert({ message, type, visible: true });
    setTimeout(() => setAlert((a) => ({ ...a, visible: false })), 1800);
  };

  const handleSignUp = () => {
    setSubmitAttempted(true);
    setError('');
    if (!fullName || !email || !password || !confirmPassword || !birthday) {
      showAlert('Please fill in all required fields.', 'error');
      return;
    }
    if (!validateEmail(email)) {
      showAlert('Provide a valid email address.', 'error');
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
      showAlert('Sign up successful! Please verify your email.', 'success');
      setTimeout(() => {
        router.push({ pathname: '/verify-code', params: { email } });
      }, 1200);
    }, 1200);
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setBirthday(selectedDate.toISOString().split('T')[0]);
    }
  };

  // Debug log to help identify which field is causing the form to be invalid
  console.log({
    fullName,
    email,
    password,
    confirmPassword,
    birthday,
    isEmailValid: validateEmail(email),
    passwordsMatch: password === confirmPassword,
    passwordLengthValid: password.length >= 6,
    isFormValid
  });

  return (
    <View style={styles.container}>
      <View style={styles.topCard} />
      <TopAlert message={alert.message} type={alert.type} visible={alert.visible} />
      <ScrollView style={{flex: 1}} contentContainerStyle={{paddingHorizontal: 24, paddingTop: width * 0.75, paddingBottom: 32}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        {error ? (
          <View style={styles.mainErrorBox}>
            <Text style={styles.mainErrorText}>{error}</Text>
          </View>
        ) : null}
        <Text style={styles.title}>Let&apos;s show you around</Text>
        <Text style={styles.subtitle}>Enter your personal account details to start enjoying OctoMarket features.</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            style={[
              styles.input,
              fullNameFocused && styles.inputFocused,
              error && !fullName ? styles.inputError : null,
            ]}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
            value={fullName}
            onChangeText={setFullName}
            onFocus={() => setFullNameFocused(true)}
            onBlur={() => setFullNameFocused(false)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              emailFocused && styles.inputFocused,
              (submitAttempted && (!email || !validateEmail(email))) && styles.inputError,
            ]}
            placeholder="Email Address"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          {(submitAttempted && (!email || !validateEmail(email))) && (
            <View style={styles.errorRow}>
              <Ionicons name="alert-circle-outline" size={18} color="#D32F2F" style={{ marginRight: 4 }} />
              <Text style={styles.errorText}>Invalid email</Text>
            </View>
          )}
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                passwordFocused && styles.inputFocused,
                error && password ? styles.inputError : null,
              ]}
              placeholder="Password"
              placeholderTextColor="#aaa"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.showHideBtn}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={22}
                color={Colors.light.tint}
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
                confirmPasswordFocused && styles.inputFocused,
                error && confirmPassword ? styles.inputError : null,
              ]}
              placeholder="Confirm Password"
              placeholderTextColor="#aaa"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              onFocus={() => setConfirmPasswordFocused(true)}
              onBlur={() => setConfirmPasswordFocused(false)}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.showHideBtn}>
              <Ionicons
                name={showConfirmPassword ? 'eye' : 'eye-off'}
                size={22}
                color={Colors.light.tint}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Referral Code (Optional)</Text>
          <TextInput
            style={[
              styles.input,
              referralFocused && styles.inputFocused,
            ]}
            placeholder="Referral Code (Optional)"
            placeholderTextColor="#aaa"
            value={referralCode}
            onChangeText={setReferralCode}
            onFocus={() => setReferralFocused(true)}
            onBlur={() => setReferralFocused(false)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Birthday</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={[
                styles.input,
                birthdayFocused && styles.inputFocused,
                error && !birthday ? styles.inputError : null,
              ]}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#aaa"
              value={birthday}
              editable={false}
              pointerEvents="none"
              onFocus={() => setBirthdayFocused(true)}
              onBlur={() => setBirthdayFocused(false)}
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthday ? new Date(birthday) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
              maximumDate={new Date()}
            />
          )}
        </View>
        <TouchableOpacity
          style={[styles.button, (!isFormValid || loading) ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={handleSignUp}
          disabled={!isFormValid || loading}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </ScrollView>
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
    zIndex: 1,
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
    backgroundColor: '#F6F2F8',
    color: '#222',
  },
  inputFocused: {
    borderColor: PURPLE,
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
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 8,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  mainErrorBox: {
    borderWidth: 1,
    borderColor: '#D32F2F',
    backgroundColor: '#FFF0F0',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  mainErrorText: {
    color: '#D32F2F',
    fontSize: 16,
  },
}); 