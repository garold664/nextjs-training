'use client';

import Link from 'next/link';

import { useFormState } from 'react-dom';

import { signup } from '@/actions/auth-actions';

export default function AuthForm({ mode }: { mode: string }) {
  const [formState, formAction] = useFormState(signup, { errors: {} });
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formState?.errors && (
        <ul id="form-errors">
          {Object.entries(formState.errors).map(([errName, errText]) => (
            <li key={errName}>
              {errName} : {errText}
            </li>
          ))}
        </ul>
      )}
      <p>
        {mode === 'signup' && <button type="submit">Create Account</button>}
        {mode === 'login' && <button type="submit">Login</button>}
      </p>
      <p>
        {mode === 'signup' && (
          <Link href="/?mode=login">Login with existing account.</Link>
        )}
        {mode === 'login' && <Link href="/?mode=signup">Signup.</Link>}
      </p>
    </form>
  );
}
