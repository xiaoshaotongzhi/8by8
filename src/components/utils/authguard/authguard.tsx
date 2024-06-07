'use client';
import { UserContext } from '@/contexts/user-context';
import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface AuthGuardProps {
  children?: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { user } = useContextSafely(UserContext, 'AuthGuard');
  const router = useRouter();

  if (!user) {
    router.push('/signin');
  }

  return <>{children}</>;
}
