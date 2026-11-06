import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from '@/components/logo/logo';
import { AppRoute, AuthorizationStatus } from '@/const';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { loginAction } from '@/store/api-actions';
import { getAuthorizationStatus } from '@/store/selectors';
import styles from './login-page.module.css';

type FieldName = 'email' | 'password';

type LoginForm = Record<FieldName, string>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM: LoginForm = { email: '', password: '' };

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

function LoginPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const [form, setForm] = useState<LoginForm>(EMPTY_FORM);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (authorizationStatus === AuthorizationStatus.Auth) {
    return <Navigate to={AppRoute.Root} replace />;
  }

  const handleFieldChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    if (!isFieldName(name)) {
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (): Promise<void> => {
    const validationError = validate(form);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await dispatch(loginAction({ ...form, email: form.email.trim() })).unwrap();
      navigate(AppRoute.Root, { replace: true });
    } catch (reason) {
      setError(typeof reason === 'string' ? reason : 'Sign in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    void submit();
  };

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities: authorization</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo type="header" />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" action="#" method="post" onSubmit={handleSubmit}>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="login-email">
                  E-mail
                </label>
                <input
                  className="login__input form__input"
                  id="login-email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  autoComplete="email"
                  required
                  value={form.email}
                  disabled={isSubmitting}
                  onChange={handleFieldChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden" htmlFor="login-password">
                  Password
                </label>
                <input
                  className="login__input form__input"
                  id="login-password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  value={form.password}
                  disabled={isSubmitting}
                  onChange={handleFieldChange}
                />
              </div>
              {error && (
                <p className={styles.error} role="alert">
                  {error}
                </p>
              )}
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
