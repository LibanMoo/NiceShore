const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter your email address.';
  if (!EMAIL_RE.test(v)) return 'Enter a valid email address.';
}

export function validateLoginPassword(value: string): string | undefined {
  if (!value) return 'Enter your password.';
}

export const MIN_PASSWORD_LENGTH = 8;

export function validateNewPassword(value: string): string | undefined {
  if (!value) return 'Create a password.';
  if (value.length < MIN_PASSWORD_LENGTH)
    return `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) return 'Include at least one letter and one number.';
}

export function validateFullName(value: string): string | undefined {
  const v = value.trim();
  if (!v) return 'Enter your full name.';
  if (v.length < 2) return 'Name looks too short.';
}

/** Formats raw typing into "DD/MM/YYYY" as the user types. */
export function formatDateInput(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
  return parts.join('/');
}

/** Parses "DD/MM/YYYY" into a Date, or null if it isn't a real calendar date. */
export function parseDateInput(value: string): Date | null {
  const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (!m) return null;
  const [day, month, year] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(year, month - 1, day);
  const valid =
    date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return valid ? date : null;
}

export function validateDateOfBirth(value: string): string | undefined {
  if (!value) return 'Enter your date of birth.';
  const date = parseDateInput(value);
  if (!date) return 'Use the format DD/MM/YYYY.';
  const now = new Date();
  if (date > now) return 'Date of birth can’t be in the future.';
  if (date.getFullYear() < now.getFullYear() - 120) return 'Enter a valid year.';
}
