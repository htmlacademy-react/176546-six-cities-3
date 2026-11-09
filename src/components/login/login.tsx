import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginAction } from '@/store/api-actions';
import { getLoginError, selectAuthState, selectLoginStatus } from '@/store/selectors';
import { EMAIL_PATTERN, EMPTY_FORM, LOGIN_FIELDS } from './const';

type FieldName = 'email' | 'password';

type LoginForm = Record<FieldName, string>;

const isFieldName = (name: string): name is FieldName =>
  name === 'email' || name === 'password';

const validate = ({ email, password }: LoginForm): string => {
  if (!EMAIL_PATTERN.test(email.trim())) {
    return 'Enter a valid email address.';
  }

  if (password.trim().length === 0) {
    return 'Password must contain something other than spaces.';
  }

  return '';
};

function Login(): JSX.Element {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(selectAuthState);
  const { isLoading } = useAppSelector(selectLoginStatus);
  const serverError = useAppSelector(getLoginError);

  const [form, setForm] = useState<LoginForm>(EMPTY_FORM);
  const [validationError, setValidationError] = useState('');

  if (isAuthenticated) {
    return <Navigate to={AppRoute.Root} replace />;
  }

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    if (!isFieldName(name)) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const validationMessage = validate(form);

    if (validationMessage) {
      setValidationError(validationMessage);
      return;
    }

    setValidationError('');
    dispatch(loginAction({ ...form, email: form.email.trim() }));
  };

  const message = validationError || serverError;

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
        {LOGIN_FIELDS.map((field) => (
          <div className="login__input-wrapper form__input-wrapper" key={field.name}>
            <label className="visually-hidden" htmlFor={`login-${field.name}`}>
              {field.label}
            </label>
            <input
              className="login__input form__input"
              id={`login-${field.name}`}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required
              value={form[field.name]}
              disabled={isLoading}
              onChange={handleFieldChange}
            />
          </div>
        ))}
        {message && (
          <p role="alert">
            {message}
          </p>
        )}
        <button className="login__submit form__submit button" type="submit" disabled={isLoading}>
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

export default Login;
