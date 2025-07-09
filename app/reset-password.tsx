import { TopAlert } from '@/components/TopAlert';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
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

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error';
    visible: boolean;
  }>({ message: '', type: 'success', visible: false });

  const router = useRouter();

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

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

  const handleReset = () => {
    if (!validateEmail(email)) {
      showAlert('Invalid email address.', 'error');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      showAlert('Reset link sent successfully!', 'success', () => {
        router.push({ pathname: '/verify-reset-code', params: { email } });
      });
    }, 1200);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <View style={styles.container}>
          <TopAlert
            message={alert.message}
            type={alert.type}
            visible={alert.visible}
          />
          <KeyboardAwareScrollView
            contentContainerStyle={styles.content}
            keyboardShouldPersistTaps="handled"
            enableOnAndroid
            enableAutomaticScroll
            extraScrollHeight={40}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
          >
            {/* SVG Header */}
            <View style={{ position: 'relative' }}>
              <Svg
                width={width * 1.7}
                height={width * 1.2}
                viewBox={`0 0 ${width * 1.7} ${width * 1.2}`}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 0,
                  marginBottom: -176,
                  marginLeft: -(width * 0.35),
                }}
              >
                <Path
                  d={`M0,0 Q${(width * 1.4) / 2},${width * 1.2} ${width * 1.7},0 L${width * 1.7},0 L0,0 Z`}
                  fill="#4A154B"
                />
              </Svg>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ position: 'absolute', top: 100, left: 7, zIndex: 2 }}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="arrow-back" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={styles.title}>Reset password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we'll send you a link to reset your password.
            </Text>

            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor:
                    alert.visible && alert.type === 'error'
                      ? '#FDECEC'
                      : email
                        ? '#EDE8ED'
                        : '#FFFFFF',
                },
                alert.visible && alert.type === 'error' ? styles.inputError : null,
              ]}
              placeholder="Email address"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <TouchableOpacity
              style={[
                styles.button,
                !email || loading ? styles.buttonDisabled : styles.buttonEnabled,
              ]}
              onPress={handleReset}
              disabled={!email || loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Sending...' : 'Reset password'}
              </Text>
            </TouchableOpacity>
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
  title: {
    marginBottom: 8,
    color: '#000000',
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    marginBottom: 24,
    color: '#555',
    fontSize: 14,
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
  button: {
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 48,
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
    fontWeight: 'bold',
    fontSize: 16,
  },
});

