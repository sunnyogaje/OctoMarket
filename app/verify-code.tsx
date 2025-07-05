import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useLocalSearchParams } from 'expo-router';
import { useRef, useState } from 'react';
import { Dimensions, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function VerifyCodeScreen() {
  const { email } = useLocalSearchParams();
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputs = [useRef(null), useRef(null), useRef(null), useRef(null)];

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
    setError('');
    setSuccess(false);
    if (code.join('') !== '1234') {
      setError('Invalid code.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1200);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 2000);
  };

  const isCodeComplete = code.every((digit) => digit.length === 1);

  return (
    <View style={styles.container}>
      <View style={styles.topCard} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>Verify your email address</ThemedText>
        <ThemedText style={styles.subtitle}>
          We sent a 4-digit code to your email address{email ? ` (${email})` : ''}. Enter it below to verify.
        </ThemedText>
        <View style={styles.codeRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={inputs[idx]}
              style={[styles.codeInput, error ? styles.inputError : null]}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              keyboardType="number-pad"
              maxLength={1}
              textAlign="center"
              returnKeyType="next"
            />
          ))}
        </View>
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        {success ? (
          <ThemedText style={styles.success}>Your email has been verified!</ThemedText>
        ) : null}
        <TouchableOpacity style={styles.resendBtn} onPress={handleResend} disabled={resent}>
          <ThemedText type="link">{resent ? 'Code resent!' : 'Resend code'}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, (!isCodeComplete || loading) && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={!isCodeComplete || loading}
        >
          <ThemedText style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</ThemedText>
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
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  codeInput: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    width: 48,
    height: 48,
    marginHorizontal: 6,
    fontSize: 24,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#D32F2F',
    backgroundColor: '#FFF0F0',
  },
  resendBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
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