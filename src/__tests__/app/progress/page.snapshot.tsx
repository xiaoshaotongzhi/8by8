import { render, cleanup } from '@testing-library/react';
import { mockDialogMethods } from '@/testing-utils/mock-dialog-methods';
import Progress from '@/app/progress/page';
import { UserType } from '@/model/enums/user-type';
import { UserContext, UserContextType } from '@/contexts/user-context';
import type { User } from '@/model/types/user';

describe('Progress', () => {
  mockDialogMethods();
  afterEach(cleanup);

  it('renders progress page unchanged', () => {
    const user: User = {
      uid: '123',
      email: 'challenger1@example.com',
      name: 'Challenger1',
      avatar: '1',
      type: UserType.Challenger,
      completedActions: {
        sharedChallenge: false,
        electionReminders: false,
        registerToVote: false,
      },
      badges: [],
      challengeEndDate: '12-31-2025',
      completedChallenge: false,
      redeemedAward: false,
      contributedTo: [],
      shareCode: '',
    };

    const { container } = render(
      <UserContext.Provider value={{ user } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
