import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, type TextInputInstance } from 'react-native';

import { AuthPrompt } from '@/components/auth/auth-prompt';
import { AuthScreen } from '@/components/auth/auth-screen';
import { FormError } from '@/components/auth/form-error';
import { PrimaryButton } from '@/components/auth/primary-button';
import { TextField } from '@/components/auth/text-field';
import { Logo } from '@/components/ui/logo';
import { FontFamily, Palette, Space, Type } from '@/constants/design';
import { useAuth } from '@/context/auth-context';
import { validateEmail, validateLoginPassword } from '@/utils/validation';

type Errors = { email?: string; password?: string };

export default function LoginScreen() {
  const { signIn } = useAuth();
  const passwordRef = useRef<TextInputInstance>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const validate = (next = { email, password }): Errors => ({
    email: validateEmail(next.email),
    password: validateLoginPassword(next.password),
  });

  // After the first submit, re-check fields live as the user fixes them.
  const update = (field: keyof Errors, value: string) => {
    const next = { email, password, [field]: value };
    if (field === 'email') setEmail(value);
    else setPassword(value);
    setFormError(null);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const found = validate();
    setErrors(found);
    if (found.email || found.password) return;

    setLoading(true);
    setFormError(null);
    try {
      await signIn(email, password);
      // The root layout's protected routes move us to the app automatically.
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthScreen
      paddingTop={64}
      gap={40}
      footer={
        <AuthPrompt
          text="New to NiceShore?"
          action="Create an account"
          onPress={() => router.push('/sign-up')}
        />
      }>
      <Logo markSize={64} fontSize={24} lineHeight={32} gap={12} stacked />

      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          Welcome back
        </Text>
        <Text style={styles.subtitle}>Log in to see your saved beaches and tide alerts.</Text>
      </View>

      <View style={styles.form}>
        <FormError message={formError} />

        <TextField
          label="Email address"
          icon="mail"
          value={email}
          onChangeText={(v) => update('email', v)}
          error={errors.email}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          submitBehavior="submit"
        />

        <View style={styles.passwordGroup}>
          <TextField
            ref={passwordRef}
            label="Password"
            icon="lock"
            password
            value={password}
            onChangeText={(v) => update('password', v)}
            error={errors.password}
            placeholder="Your password"
            autoCapitalize="none"
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
          />
          <Pressable
            style={styles.forgot}
            accessibilityRole="link"
            onPress={() =>
              // TODO: route to a forgot-password screen once it's designed.
              Alert.alert('Reset password', 'Password reset is coming soon.')
            }>
            {({ pressed }) => (
              <Text style={[styles.forgotText, pressed && styles.linkPressed]}>Forgot password?</Text>
            )}
          </Pressable>
        </View>

        <PrimaryButton title="Log in" loading={loading} onPress={handleSubmit} />
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: Space.stackSm,
  },
  title: {
    ...Type.headlineLg,
    color: Palette.primary,
    textAlign: 'center',
  },
  subtitle: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
  form: {
    gap: 20,
  },
  passwordGroup: {
    gap: Space.stackSm,
  },
  forgot: {
    alignSelf: 'flex-end',
    minHeight: 44,
    justifyContent: 'center',
  },
  forgotText: {
    ...Type.bodySm,
    fontFamily: FontFamily.semiBold,
    color: Palette.secondary,
  },
  linkPressed: {
    color: Palette.primary,
  },
});
