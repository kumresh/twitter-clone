'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface IAuthProvider {
  session: Session;
  children?: React.ReactNode;
}

export default function AuthProvider({ session, children }: IAuthProvider) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
