import { TopAlert } from '@/components/TopAlert';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Link, Stack, useRouter } from 'expo-router';
import moment from 'moment';
import { useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width } = Dimensions.get('window');
const PURPLE = '#4A154B';

export default function SignUpScreen() {
  const [FirstName, setFirstName] = useState('');
   const [LastName, setLastName] = useState('');
  

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
  const [FirstNameFocused, setFirstNameFocused] = useState(false);
  const [LastNameFocused, setLastNameFocused] = useState(false);

  
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [referralFocused, setReferralFocused] = useState(false);
  const [birthdayFocused, setBirthdayFocused] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({ message: '', type: 'success', visible: false });

  const router = useRouter();

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
  // Button is only disabled if required fields are empty
  const isButtonDisabled = !FirstName || !LastName  || !email || !password || !confirmPassword || !birthday;

  const showAlert = (message: string, type: 'success' | 'error' = 'success') => {
    setAlert({ message, type, visible: true });
    setTimeout(() => setAlert((a) => ({ ...a, visible: false })), 1800);
  };

  const handleSignUp = () => {
    setSubmitAttempted(true);
    setError('');
    if (!FirstName) return setError('First name is required.');
      if (!LastName) return setError('Last name is required.');
    if (!email) return setError('Email is required.');
    if (!validateEmail(email)) return setError('Provide a valid email address.');
    if (!password) return setError('Password is required.');
    if (password.length < 8) return setError('Password must be at least 8 characters.');
    if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) return setError('Password must contain at least one letter and one number.');
    if (!confirmPassword) return setError('Please confirm your password.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    if (!birthday) return setError('Birthday is required.');
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
  // console.log({
  //   fullName,
  //   email,
  //   password,
  //   confirmPassword,
  //   birthday,
  //   isEmailValid: validateEmail(email),
  //   passwordsMatch: password === confirmPassword,
  //   passwordLengthValid: password.length >= 6,
  //   isFormValid
  // });

  return (
     <>
    <Stack.Screen options={{ headerShown: false }} />
     <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
    <View style={styles.container}>
      <TopAlert message={error || alert.message} type={error ? 'error' : alert.type} visible={!!error || alert.visible} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={Platform.OS === 'ios' ? 40 : 80}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
      >
        <Svg
          width={width * 1.7}
          height={width * 1.2}
          viewBox={`0 0 ${width * 1.7} ${width * 1.2}`}
          style={{
            alignSelf: 'flex-start',
            marginTop: 0,
            marginBottom: -179,
            marginLeft: -(width * 0.35),
          }}
        >
          <Path
            d={`M0,0 Q${(width * 1.4) / 2},${width * 1.2} ${width * 1.7},0 L${width * 1.7},0 L0,0 Z`}
            fill={PURPLE}
          />
        </Svg>

         <TouchableOpacity
                onPress={() => router.back()}
                style={{ position: 'absolute', top: 100, left: 20, zIndex: 2 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
            <Ionicons name="arrow-back" size={19} color="#fff" />
          </TouchableOpacity>
        <Text style={styles.title}>Let&apos;s show you around</Text>
        <Text style={styles.subtitle}>Enter your personal account details to start enjoying OctoMarket features.</Text>

        {/* Full Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>First Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  error && error.toLowerCase().includes('first name')
                    ? '#FDECEC'
                    : FirstName
                      ? '#EDE8ED'
                      : '#FFFFFF',
              },
              error && error.toLowerCase().includes('full name') ? styles.inputError : null,
            ]}
            placeholder="First Name"
            placeholderTextColor="#aaa"
            value={FirstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
        </View>


         <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Last Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  error && error.toLowerCase().includes('last name')
                    ? '#FDECEC'
                    : LastName
                      ? '#EDE8ED'
                      : '#FFFFFF',
              },
              error && error.toLowerCase().includes('last name') ? styles.inputError : null,
            ]}
            placeholder="Last Name"
            placeholderTextColor="#aaa"
            value={LastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor:
                  error && (error.toLowerCase().includes('email') || error.toLowerCase().includes('valid email'))
                    ? '#FDECEC'
                    : email
                      ? '#EDE8ED'
                      : '#FFFFFF',
              },
              error && (error.toLowerCase().includes('email') || error.toLowerCase().includes('valid email')) ? styles.inputError : null,
            ]}
            placeholder="Provide valid email address"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                {
                  backgroundColor:
                    error && (error.toLowerCase().includes('password') && !error.toLowerCase().includes('confirm'))
                      ? '#FDECEC'
                      : password
                        ? '#EDE8ED'
                        : '#FFFFFF',
                },
                error && (error.toLowerCase().includes('password') && !error.toLowerCase().includes('confirm')) ? styles.inputError : null,
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
                color={'#6B7280'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputPasswordWrapper}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                {
                  backgroundColor:
                    error && error.toLowerCase().includes('confirm')
                      ? '#FDECEC'
                      : confirmPassword
                        ? '#EDE8ED'
                        : '#FFFFFF',
                },
                error && error.toLowerCase().includes('confirm') ? styles.inputError : null,
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
                color={'#6B7280'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Birthday */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Birthday</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor:
                    error && error.toLowerCase().includes('birthday')
                      ? '#FDECEC'
                      : birthday
                        ? '#EDE8ED'
                        : '#FFFFFF',
                },
                error && error.toLowerCase().includes('birthday') ? styles.inputError : null,
              ]}
              placeholder="DD/MM"
              placeholderTextColor="#aaa"
              value={birthday ? moment(birthday).format('DD/MM') : ''}
              editable={false}
              pointerEvents="none"
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthday ? new Date(birthday) : new Date()}
              mode="date"
              display="default"
              onChange={onChangeDate}
            />
          )}
        </View>

        {/* Referral Code (Optional) */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Referral Code (Optional)</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: referralCode ? '#EDE8ED' : '#FFFFFF',
              },
            ]}
            placeholder="Referral Code (Optional)"
            placeholderTextColor="#aaa"
            value={referralCode}
            onChangeText={setReferralCode}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, (isButtonDisabled || loading) ? styles.buttonDisabled : styles.buttonEnabled]}
          onPress={handleSignUp}
          disabled={isButtonDisabled || loading}
        >
          <Text style={styles.buttonText}>Sign up</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={styles.switchText}>Already have an account? </Text>
          <Link href="/login" asChild>
            <TouchableOpacity>
              <Text style={styles.linkText}>Login</Text>
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
    paddingBottom: Math.max(40, Math.round(Dimensions.get('window').height * 0.07)), // Responsive bottom padding
  },
  title: {
    marginTop: 21,
    marginBottom: 8,
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'left',
  },
  subtitle: {
    marginBottom: 28,
    color: '#000000',
    fontSize: 14,
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
    backgroundColor: '#4A154B',
  },
  buttonDisabled: {
    backgroundColor: '#B4B4B4',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: 14,
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
    marginTop: 6,
  },
  switchText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '400',
  },
  linkText: {
    color: '#6366F1',
    fontWeight: '400',
    fontSize: 14,
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
}); 