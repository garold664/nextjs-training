'use server';

import { error } from 'console';

type Errors = {
  email?: string;
  password?: string;
};

export async function signup(
  _prevState: { errors: Errors } | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  let errors: Errors = {};

  if (!email?.includes('@')) {
    errors.email = 'Invalid email';
  }

  if (password && password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }
}
