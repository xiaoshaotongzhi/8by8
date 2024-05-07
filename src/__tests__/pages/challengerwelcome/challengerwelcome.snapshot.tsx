import ChallengerWelcome from '@/app/challengerwelcome/page';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { cleanup, render } from '@testing-library/react';
import { Builder } from 'builder-pattern';

import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('ChallengerWelcome', () => {
  afterEach(cleanup);

  it('renders challenger-welcome page unchanged', () => {
    const userCtxValue = Builder<UserContextType>().user(null).build();

    const { container } = render(
      <UserContext.Provider value={userCtxValue}>
        <ChallengerWelcome />
      </UserContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
