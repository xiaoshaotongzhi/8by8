'use client';
import { UserContext } from '@/contexts/user-context';
import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

interface UnAuthGuardProps {
    children?: ReactNode;
}

export function AuthGuard({ children }: UnAuthGuardProps) {
    const { user } = useContextSafely(UserContext, 'UnAuthGuard');
    const router = useRouter();

    if (user) {
        router.push('');
    }

    return <>{children}</>;
}