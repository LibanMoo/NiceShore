import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View, type TextInputInstance } from 'react-native';

import { AuthScreen } from '@/components/auth/auth-screen';
import { FormError } from '@/components/auth/form-error';
import { GlowOrb } from '@/components/auth/glow-orb';
import { PrimaryButton } from '@/components/auth/primary-button';
import { SocialAuth } from '@/components/auth/social-auth';
import { TextField } from '@/components/auth/text-field';
import { Icon } from '@/components/ui/icon';
import { FontFamily, Palette, Radius, Shadow, Space, Type } from '@/constants/design';
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
    <AuthScreen backgroundColor={Palette.background}>
      <View style={styles.card}>
        {/* Ambient glassmorphic accents, clipped by the card */}
        <GlowOrb rgb="213, 227, 255" size={320} opacity={0.8} top={-160} left={-160} />
        <GlowOrb rgb="195, 232, 255" size={320} opacity={0.8} bottom={-160} right={-160} />

        {/* Branding */}
        <View style={styles.brand}>
          <View style={styles.logoTile}>
            <Icon name="sailing" size={36} color={Palette.primary} />
          </View>
          <Text style={styles.brandName}>NiceShore</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to access your saved beaches and tide alerts.</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <FormError message={formError} />

          <TextField
            label="Email Address"
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

          <TextField
            ref={passwordRef}
            label="Password"
            icon="lock"
            password
            value={password}
            onChangeText={(v) => update('password', v)}
            error={errors.password}
            placeholder="••••••••"
            autoCapitalize="none"
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={handleSubmit}
            labelAccessory={
              <Pressable
                hitSlop={8}
                accessibilityRole="link"
                onPress={() =>
                  // TODO: route to a forgot-password screen once it's designed.
                  Alert.alert('Reset password', 'Password reset is coming soon.')
                }>
                {({ pressed }) => (
                  <Text style={[styles.forgot, pressed && styles.linkPressed]}>Forgot Password?</Text>
                )}
              </Pressable>
            }
          />

          <View style={styles.submit}>
            <PrimaryButton title="Sign In" loading={loading} onPress={handleSubmit} />
          </View>
        </View>

        <SocialAuth caption="Or continue with" />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don&apos;t have an account? </Text>
          <Pressable hitSlop={8} accessibilityRole="link" onPress={() => router.push('/sign-up')}>
            {({ pressed }) => (
              <Text style={[styles.footerLink, pressed && styles.linkPressed]}>Sign Up</Text>
            )}
          </Pressable>
        </View>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Palette.surface,
    borderRadius: Radius.lg,
    boxShadow: Shadow.card,
    padding: Space.stackLg,
    overflow: 'hidden',
    minHeight: 600,
    justifyContent: 'center',
  },
  brand: {
    alignItems: 'center',
    marginBottom: Space.stackLg,
  },
  logoTile: {
    width: 64,
    height: 64,
    borderRadius: Radius.lg,
    backgroundColor: Palette.surfaceLow,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Space.stackMd,
    boxShadow: Shadow.tile,
  },
  brandName: {
    ...Type.headlineLg,
    color: Palette.primary,
    textAlign: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Space.stackLg,
  },
  title: {
    ...Type.headlineMd,
    color: Palette.onSurface,
    marginBottom: Space.stackSm,
    textAlign: 'center',
  },
  subtitle: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
  form: {
    gap: Space.stackMd,
    marginBottom: Space.stackLg,
  },
  forgot: {
    ...Type.labelCaps,
    color: Palette.primary,
  },
  submit: {
    marginTop: Space.stackSm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginTop: Space.stackLg,
  },
  footerText: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  footerLink: {
    ...Type.bodyMd,
    fontFamily: FontFamily.semiBold,
    color: Palette.primary,
  },
  linkPressed: {
    opacity: 0.6,
  },
});
