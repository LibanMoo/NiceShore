import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View, type TextInputInstance } from 'react-native';

import { AuthPrompt } from '@/components/auth/auth-prompt';
import { AuthScreen } from '@/components/auth/auth-screen';
import { FormError } from '@/components/auth/form-error';
import { PrimaryButton } from '@/components/auth/primary-button';
import { TextField } from '@/components/auth/text-field';
import { Icon } from '@/components/ui/icon';
import { Logo } from '@/components/ui/logo';
import { Palette, Radius, Space, Type } from '@/constants/design';
import { useAuth } from '@/context/auth-context';
import {
  formatDateInput,
  MIN_PASSWORD_LENGTH,
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

  const goToLogin = () => {
    if (router.canGoBack()) router.back();
    else router.replace('/login');
  };

  return (
    <AuthScreen
      paddingTop={12}
      gap={28}
      footer={<AuthPrompt text="Already have an account?" action="Log in" onPress={goToLogin} />}>
      <View style={styles.topBar}>
        <Pressable
          onPress={goToLogin}
          accessibilityRole="button"
          accessibilityLabel="Back to log in"
          style={({ pressed }) => [styles.back, pressed && styles.backPressed]}>
          <Icon name="arrowBack" color={Palette.primary} />
        </Pressable>
        <Logo markSize={28} fontSize={18} lineHeight={24} gap={8} />
        <View style={styles.topBarSpacer} />
      </View>

      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          Create your account
        </Text>
        <Text style={styles.subtitle}>Save your favourite beaches and get tide alerts.</Text>
      </View>

      <View style={styles.form}>
        <FormError message={formError} />

        <TextField
          label="Full name"
          icon="person"
          value={values.fullName}
          onChangeText={(v) => update('fullName', v)}
          error={errors.fullName}
          placeholder="Your full name"
          autoCapitalize="words"
          autoComplete="name"
          textContentType="name"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => emailRef.current?.focus()}
        />

        <TextField
          ref={emailRef}
          label="Email address"
          icon="mail"
          value={values.email}
          onChangeText={(v) => update('email', v)}
          error={errors.email}
          placeholder="you@example.com"
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
          value={values.password}
          onChangeText={(v) => update('password', v)}
          error={errors.password}
          hint={`At least ${MIN_PASSWORD_LENGTH} characters, with a letter and a number.`}
          placeholder="Create a password"
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          returnKeyType="next"
          submitBehavior="submit"
          onSubmitEditing={() => dobRef.current?.focus()}
        />

        <TextField
          ref={dobRef}
          label="Date of birth"
          icon="calendar"
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
          <PrimaryButton title="Create account" loading={loading} onPress={handleSubmit} />
        </View>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
  },
  back: {
    width: 44,
    height: 44,
    borderRadius: Radius.full,
    backgroundColor: Palette.sand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backPressed: {
    backgroundColor: Palette.surfaceVariant,
  },
  topBarSpacer: {
    width: 44,
  },
  header: {
    gap: Space.stackSm,
  },
  title: {
    ...Type.headlineLg,
    color: Palette.primary,
  },
  subtitle: {
    ...Type.bodyMd,
    color: Palette.onSurfaceVariant,
  },
  form: {
    gap: 20,
  },
  submit: {
    marginTop: 4,
  },
});
