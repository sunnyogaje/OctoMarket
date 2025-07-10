import { ThemedText } from '@/components/ThemedText';
import { TopAlert } from '@/components/TopAlert';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Dimensions,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function VerifyResetCodeScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email?: string }>();

  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const inputs = useRef<TextInput[]>([]);

  const showAlert = (
    message: string,
    type: 'success' | 'error' = 'success',
    cb?: () => void
  ) => {
    setAlert({ message, type, visible: true });
    setTimeout(() => {
      setAlert((a) => ({ ...a, visible: false }));
      if (cb) cb();
    }, 1800);
  };

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);
      setError('');

      if (text && idx < 3) {
        inputs.current[idx + 1]?.focus();
      }

      if (!text && idx > 0) {
        inputs.current[idx - 1]?.focus();
      }
    }
  };

  const handleVerify = () => {
    setError('');
    const enteredCode = code.join('');
    // TODO: Replace with actual backend verification
    if (enteredCode !== '1234') {
      showAlert('Invalid code.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showAlert('Code verified! Set your new password.', 'success', () => {
        router.push({ pathname: '/create-new-password', params: { email: String(email) } });
      });
    }, 1200);
  };

  const handleResend = () => {
    setResent(true);
    setTimeout(() => setResent(false), 2000);
    showAlert('Verification code resent.', 'success');
  };

  const isCodeComplete = code.every((digit) => digit.length === 1);

  return (
    <View style={styles.container}>
      <View style={styles.topCard} />
      <TopAlert message={alert.message} type={alert.type} visible={alert.visible} />
      <View style={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Provide the code sent to your email
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          We sent a 4-digit code to your email
          {email ? ` (${String(email)})` : ''}. Enter it below to continue.
        </ThemedText>

        <View style={styles.codeRow}>
          {code.map((digit, idx) => (
            <TextInput
              key={idx}
              ref={(el) => (inputs.current[idx] = el!)}
              style={[styles.codeInput, error ? styles.inputError : null]}
              value={digit}
              onChangeText={(text) => handleChange(text, idx)}
              keyboardType={
                Platform.OS === 'ios' ? 'number-pad' : 'numeric'
              }
              maxLength={1}
              textAlign="center"
              returnKeyType="done"
              autoFocus={idx === 0}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.resendBtn} onPress={handleResend} disabled={resent}>
          <ThemedText type="link">{resent ? 'Code resent!' : 'Resend code'}</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, (!isCodeComplete || loading) && styles.buttonDisabled]}
          onPress={handleVerify}
          disabled={!isCodeComplete || loading}
        >
          <ThemedText style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Reset password'}
          </ThemedText>
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
    color: '#222',
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
