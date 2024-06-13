'use server';

import { createAuthSession } from '@/lib/auth';
import { hashUserPassword, verifyPassword } from '@/lib/hash';
import { createUser, getUserByEmail } from '@/lib/users';

import { redirect } from 'next/navigation';

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

  if (email && password) {
    const hashedPassword = hashUserPassword(password);
    try {
      const userId = createUser(email, hashedPassword);
      createAuthSession(userId);
      redirect('/training');
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return {
          errors: {
            email: 'User with that email already exists',
          },
        };
      }

      throw error;
    }
  }
}

export async function login(
  _prevState: { errors: Errors } | undefined,
  formData: FormData
) {
  const email = formData.get('email') as string | null;
  const password = formData.get('password') as string | null;

  if (!email) {
    return {
      errors: {
        email: 'Please enter an email',
      },
    };
  }

  if (!password) {
    return {
      errors: {
        password: 'Please enter your password',
      },
    };
  }

  const existingUser = getUserByEmail(email);
  if (!existingUser) {
    return {
      errors: {
        email: 'User with that email does not exist',
      },
    };
  }

  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password: 'The wrong password',
      },
    };
  }

  createAuthSession(existingUser.id);
  redirect('/training');
}
