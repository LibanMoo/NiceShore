import { createContext, use, useCallback, useMemo, useState, type ReactNode } from 'react';

export type User = {
  name: string;
  email: string;
};

export type SignUpInput = {
  fullName: string;
  email: string;
  password: string;
  /** ISO date string, YYYY-MM-DD. */
  dateOfBirth: string;
};

type AuthContextValue = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Holds the signed-in user. Right now sign in / sign up are simulated so the
 * UI flow can be tested end to end.
 *
 * TODO: replace the two `await wait(...)` blocks with calls to the NiceShore
 * server (e.g. POST /auth/login and POST /auth/register), throw an Error with
 * a readable message on failure, and persist the returned token
 * (expo-secure-store) so the session survives app restarts.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(async (email: string, _password: string) => {
    await wait(900);
    const normalized = email.trim().toLowerCase();
    setUser({ name: normalized.split('@')[0], email: normalized });
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    await wait(1100);
    setUser({ name: input.fullName.trim(), email: input.email.trim().toLowerCase() });
  }, []);

  const signOut = useCallback(() => setUser(null), []);

  const value = useMemo(
    () => ({ user, signIn, signUp, signOut }),
    [user, signIn, signUp, signOut]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
  const ctx = use(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>.');
  return ctx;
}
