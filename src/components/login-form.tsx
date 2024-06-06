'use client';

import { authenticate } from '@/lib/actions';
import { useFormState, useFormStatus } from 'react-dom';

export function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form action={dispatch}>
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        className="border border-red-700"
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        type="password"
        name="password"
        className="border border-red-700"
      />

      <LoginButton />
      {errorMessage}
    </form>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      Login
    </button>
  );
}
