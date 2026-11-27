export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d).+$/;

export const EMPTY_FORM = { email: '', password: '' };

export const LOGIN_FIELDS = [
  {
    name: 'email',
    label: 'E-mail',
    type: 'email',
    placeholder: 'Email',
    autoComplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Password',
    autoComplete: 'current-password',
  },
] as const;
