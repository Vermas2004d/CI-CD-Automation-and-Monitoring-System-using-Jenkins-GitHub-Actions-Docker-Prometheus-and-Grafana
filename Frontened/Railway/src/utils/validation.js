// Basic validation helpers for Login/Signup forms.
// Return an error message string if invalid, otherwise null.

export function validateEmail(value) {
  if (!value) return 'Email is required';
  // Simple RFC5322-ish pattern; adequate for client-side feedback.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) return 'Enter a valid email address';
  return null;
}

export function validatePassword(value) {
  if (!value) return 'Password is required';
  if (value.length < 8) return 'Password must be at least 8 characters';
  // Optional additional complexity rules (uncomment if needed):
  // if (!/[A-Z]/.test(value)) return 'Include at least one uppercase letter';
  // if (!/[a-z]/.test(value)) return 'Include at least one lowercase letter';
  // if (!/\d/.test(value)) return 'Include at least one digit';
  return null;
}
