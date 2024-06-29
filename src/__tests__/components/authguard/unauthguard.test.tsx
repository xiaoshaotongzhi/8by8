import '@testing-library/jest-dom';
import {
    render,
    screen,
    cleanup,
    waitFor,
} from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import navigation from 'next/navigation';
import { AuthGuard } from '@/components/utils/authguard';
import { User } from '@/model/types/user';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { Builder } from 'builder-pattern';
import { UserType } from '@/model/enums/user-type';
import { useState } from 'react';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}));