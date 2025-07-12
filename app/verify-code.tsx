import { TopAlert } from '@/components/TopAlert';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function VerifyCodeScreen() {
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    if (timer > 0) {
      timerRef.current = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timer]);

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);
      setError('');
      if (text && idx < 3) {
        // @ts-ignore
        inputs[idx + 1].current.focus();
      }
      if (!text && idx > 0) {
        // @ts-ignore
        inputs[idx - 1].current.focus();
      }
    }
  };

  const handleVerify = () => {
    // setError('');
    // setSuccess(false);
    // if (code.join('') !== '1234') {
    //   setError('Invalid code.');
    //   return;
    // }
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setSuccess(true);
    // }, 1200);
    router.push('/(tabs)/home');
  };

  const handleResend = () => {
    setTimer(30);
  };

  const isCodeComplete = code.every((digit) => digit.length === 1);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} edges={['bottom']}>
        <View style={styles.container}>
          <TopAlert message={error} type="error" visible={!!error} />
          <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            enableAutomaticScroll
            extraScrollHeight={40}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            <View style={styles.contentWrapper}>
              {/* Back Arrow at the top */}
              <TouchableOpacity
                onPress={() => router.push('/signup')}
                style={styles.backButton}
                hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              >
                <Ionicons name="arrow-back" size={24} color="#222" />
              </TouchableOpacity>
              {/* Title and subtitle below */}
              <Text style={styles.title}>
                Verify your email {`\n`}address
              </Text>
              <Text style={styles.subtitle}>
                We sent a 4-digit code to your email address{`\n`}
                <Text style={styles.emailText}>{email || 'hannah@gmail.com'}.</Text>
                <Text style={styles.changeEmail} onPress={() => router.push('/signup')}> Change email?</Text>
              </Text>
              <View style={styles.codeRow}>
                {code.map((digit, idx) => (
                  <TextInput
                    key={idx}
                    ref={inputs[idx]}
                    style={[
                      styles.codeInput,
                      error ? styles.inputError : styles.inputNormal,
                    ]}
                    value={digit}
                    onChangeText={(text) => handleChange(text, idx)}
                    keyboardType="number-pad"
                    maxLength={1}
                    textAlign="center"
                    returnKeyType="next"
                    placeholder="•"
                    placeholderTextColor="#B4B4B4"
                    selectionColor={error ? '#D32F2F' : '#222'}
                  />
                ))}
              </View>
              <View style={styles.timerRow}>
                <Text style={styles.timerText}>{timer} secs</Text>
                <TouchableOpacity
                  style={styles.retryBtn}
                  onPress={handleResend}
                  disabled={timer > 0}
                >
                  <Text style={[styles.retryText, timer > 0 && styles.retryDisabled]}>Retry</Text>
                </TouchableOpacity>
              </View>
              {success ? (
                <Text style={styles.success}>Your email has been verified!</Text>
              ) : null}
              <TouchableOpacity
                style={[
                  styles.button,
                  (!isCodeComplete || loading) ? styles.buttonDisabled : styles.buttonEnabled,
                ]}
                onPress={handleVerify}
                disabled={!isCodeComplete || loading}
              >
                <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
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
  },
  backButton: {
    width: 56,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 8,
    paddingLeft: 0,
  },
  contentWrapper: {
    paddingTop: 64,
  },
  title: {
    marginBottom: 8,
    color: '#222',
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Lato-Bold',
    letterSpacing: 0.2,
    textAlign: 'left',
    lineHeight: 28,
    flex: 1,
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
  emailText: {
    color: '#222',
    fontWeight: '700',
    fontFamily: 'Lato-Bold',
  },
  changeEmail: {
    color: '#6366F1',
    fontWeight: '400',
    fontFamily: 'Lato',
    fontSize: 14,
  },
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  codeInput: {
    borderWidth: 1,
    borderRadius: 8,
    width: 56,
    height: 56,
    fontSize: 24,
    fontWeight: '600',
    fontFamily: 'Lato-Bold',
    letterSpacing: 1,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  inputNormal: {
    borderColor: '#E5E5E5',
    backgroundColor: '#F5F5F5',
    color: '#222',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF',
    color: '#D32F2F',
  },
  timerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  timerText: {
    color: '#222',
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    fontWeight: '400',
  },
  retryBtn: {
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  retryText: {
   color: '#B5B7BC',
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    fontSize: 14,
    // textDecorationLine: 'underline',
  },
  retryDisabled: {
    color: '#B4B4B4',
    textDecorationLine: 'none',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
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
  error: {
    color: '#D32F2F',
    marginBottom: 8,
    fontSize: 13,
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.1,
  },
  success: {
    color: '#388E3C',
    marginBottom: 8,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    letterSpacing: 0.1,
  },
}); 