import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type TextInputInstance } from 'react-native';

import { AuthScreen } from '@/components/auth/auth-screen';
import { FormError } from '@/components/auth/form-error';
import { GlowOrb } from '@/components/auth/glow-orb';
import { PrimaryButton } from '@/components/auth/primary-button';
import { SocialAuth } from '@/components/auth/social-auth';
import { TextField } from '@/components/auth/text-field';
import { FontFamily, Palette, Shadow, Space, Type } from '@/constants/design';
import { useAuth } from '@/context/auth-context';
import {
  formatDateInput,
  parseDateInput,
  validateDateOfBirth,
  validateEmail,
  validateFullName,
  validateNewPassword,
} from '@/utils/validation';

type Values = { fullName: string; email: string; password: string; dob: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { fullName: '', email: '', password: '', dob: '' };

function validate(v: Values): Errors {
  return {
    fullName: validateFullName(v.fullName),
    email: validateEmail(v.email),
    password: validateNewPassword(v.password),
    dob: validateDateOfBirth(v.dob),
  };
}

const hasErrors = (e: Errors) => Object.values(e).some(Boolean);

function toIsoDate(dob: string) {
  const d = parseDateInput(dob)!;
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mm}-${dd}`;
}

export default function SignUpScreen() {
  const { signUp } = useAuth();
  const emailRef = useRef<TextInputInstance>(null);
  const passwordRef = useRef<TextInputInstance>(null);
  const dobRef = useRef<TextInputInstance>(null);

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const update = (field: keyof Values, value: string) => {
    const next = { ...values, [field]: field === 'dob' ? formatDateInput(value) : value };
    setValues(next);
    setFormError(null);
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = async () => {
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (hasErrors(found)) return;

    setLoading(true);
    setFormError(null);
    try {
      await signUp({
        fullName: values.fullName,
        email: values.email,
        password: values.password,
        dateOfBirth: toIsoDate(values.dob),
      });
    } catch (e) {
      setFormError(e instanceof Error ? e.message : 'Could not create your account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const goToSignIn = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  return (
    <AuthScreen
      backgroundColor={Palette.sand}
      background={
        <>
          <GlowOrb rgb="0, 189, 253" size={460} opacity={0.16} top={-170} left={-190} />
          <GlowOrb rgb="0, 30, 64" size={420} opacity={0.12} bottom={-160} right={-170} />
        </>
      }>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join the coastal community and plan your perfect beach day.</Text>
      </View>

      {/* Glassmorphic card */}
      <View style={styles.card}>
        <View style={styles.form}>
          <FormError message={formError} />

          <TextField
            label="Full Name"
            icon="person"
            focusColor={Palette.secondaryContainer}
            value={values.fullName}
            onChangeText={(v) => update('fullName', v)}
            error={errors.fullName}
            placeholder="Jane Doe"
            autoCapitalize="words"
            autoComplete="name"
            textContentType="name"
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => emailRef.current?.focus()}
          />

          <TextField
            ref={emailRef}
            label="Email Address"
            icon="mail"
            focusColor={Palette.secondaryContainer}
            value={values.email}
            onChangeText={(v) => update('email', v)}
            error={errors.email}
            placeholder="jane@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />

          <TextField
            ref={passwordRef}
            label="Password"
            icon="lock"
            password
            focusColor={Palette.secondaryContainer}
            value={values.password}
            onChangeText={(v) => update('password', v)}
            error={errors.password}
            placeholder="••••••••"
            autoCapitalize="none"
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="next"
            submitBehavior="submit"
            onSubmitEditing={() => dobRef.current?.focus()}
          />

          <TextField
            ref={dobRef}
            label="Date of Birth"
            icon="calendar"
            focusColor={Palette.secondaryContainer}
            value={values.dob}
            onChangeText={(v) => update('dob', v)}
            error={errors.dob}
            placeholder="DD/MM/YYYY"
            keyboardType={Platform.OS === 'web' ? 'default' : 'number-pad'}
            inputMode="numeric"
            autoComplete="birthdate-full"
            maxLength={10}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />

          <View style={styles.submit}>
            <PrimaryButton title="Create Account" loading={loading} onPress={handleSubmit} />
          </View>
        </View>

        <View style={styles.social}>
          <SocialAuth caption="Or sign up with" />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <Pressable hitSlop={8} accessibilityRole="link" onPress={goToSignIn}>
          {({ pressed }) => (
            <Text style={[styles.footerLink, pressed && styles.linkPressed]}>Sign In</Text>
          )}
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: Space.stackLg,
  },
  title: {
    ...Type.headlineXl,
    color: Palette.primary,
    textAlign: 'center',
    marginBottom: Space.stackSm,
  },
  subtitle: {
    ...Type.bodyLg,
    color: Palette.onSurfaceVariant,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(226, 226, 231, 0.6)',
    boxShadow: Shadow.card,
    padding: Space.gutter,
  },
  form: {
    gap: Space.stackMd,
  },
  submit: {
    marginTop: Space.stackSm,
  },
  social: {
    marginTop: Space.gutter,
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
    fontFamily: FontFamily.bold,
    color: Palette.primary,
  },
  linkPressed: {
    opacity: 0.6,
  },
});
