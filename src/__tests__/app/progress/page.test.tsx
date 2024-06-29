import { render, cleanup, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { mockDialogMethods } from '@/testing-utils/mock-dialog-methods';
import Progress from '@/app/progress/page';
import { UserType } from '@/model/enums/user-type';
import { UserContext, UserContextType } from '@/contexts/user-context';
import type { User } from '@/model/types/user';
import { DateTime } from 'luxon';
import { Actions } from '@/model/enums/actions';
import userEvent from '@testing-library/user-event';
import { getErrorThrownByComponent } from '@/testing-utils/get-error-thrown-by-component';
import { calculateDaysRemaining } from '@/utils/progress/calculate-days-remaining';

describe('ProgressTest', () => {
  mockDialogMethods();
  afterEach(cleanup);

  let user: User = {
    uid: '456',
    email: 'challenger2@example.com',
    name: 'Challenger2',
    avatar: '2',
    type: UserType.Challenger,
    completedActions: {
      sharedChallenge: true,
      electionReminders: false,
      registerToVote: false,
    },
    badges: [
      { action: Actions.SharedChallenge },
      { playerName: 'Player', playerAvatar: '1' },
    ],
    challengeEndTimestamp: DateTime.now().toUnixInteger(),
    completedChallenge: true,
    redeemedAward: false,
    contributedTo: [],
    inviteCode: '',
  };

  it('renders user with 2 badges, completedChallenge: true, redeemedAward:false, registerToVote: false', () => {
    render(
      <UserContext.Provider value={{ user } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByTestId('confetti')).toBeInTheDocument();

    expect(
      screen.getByText(/You've Won! Here's Your Reward/i),
    ).toBeInTheDocument();

    expect(screen.getAllByText('Register now')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Register now')[0]).toHaveAttribute(
      'href',
      '/voterreg',
    );
  });

  it('renders user with redeemedAward: true and completedChallenge: true', () => {
    user.redeemedAward = true;

    render(
      <UserContext.Provider value={{ user } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );

    expect(screen.getByText(/You've Won! The Challenge/i)).toBeInTheDocument();
  });

  it('renders user when daysLeft is 1.', () => {
    user.completedChallenge = false;
    user.challengeEndTimestamp = DateTime.now()
      .plus({ days: 1 })
      .toUnixInteger();

    render(
      <UserContext.Provider value={{ user } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );

    expect(screen.getByText(/Day left/i)).toBeInTheDocument();
  });

  it('tests for Modal close.', async () => {
    user.redeemedAward = false;
    user.challengeEndTimestamp = DateTime.now().toUnixInteger();

    render(
      <UserContext.Provider value={{ user } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );

    jest.spyOn(HTMLDialogElement.prototype, 'close');
    expect(screen.getByText(/Oops, times up/i)).toBeInTheDocument();
    const closeBtn = screen.getByLabelText('close dialog');
    await userEvent.click(closeBtn);
    await waitFor(() =>
      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled(),
    );
  });

  it('renders user when all badges are completed.', () => {
    for (let i = 2; i < 8; i++) {
      user.badges[i] = { playerName: `test${i}`, playerAvatar: '1' };
    }

    render(
      <UserContext.Provider value={{ user } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );

    expect(screen.getByText(/You completed all/i)).toBeInTheDocument();
  });

  it('renders without error if user is null.', () => {
    const error = getErrorThrownByComponent(
      <UserContext.Provider value={{ user: null } as UserContextType}>
        <Progress />
      </UserContext.Provider>,
    );
    expect(error).toBe(null);
  });
});
