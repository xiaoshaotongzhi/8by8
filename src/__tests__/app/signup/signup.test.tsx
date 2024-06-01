import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UserContext } from '@/contexts/user-context';
import { Builder } from 'builder-pattern';
import { MockReactTurnstile } from '@/testing-utils/mock-react-turnstile';
import SignUpPage from '@/app/signup/page';
import { DummySiteKeys } from '@/constants/dummy-site-keys';

jest.mock('react-turnstile', () => MockReactTurnstile);

// wrap in user context
// window.scrollTo not implemented
describe('SignUpPage', () => {
  it(`renders an HTML form with input elements for email, confirm email and 
  avatar.`, () => {
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = DummySiteKeys.ALWAYS_PASSES;

    render(<SignUpPage />);

    const form = screen.getByRole('form');
  });
});
