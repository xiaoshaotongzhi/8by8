import { Meta, StoryObj } from '@storybook/react';
import Progress from '@/app/progress/page';
import { UserContext } from '../../contexts/user-context';
import { UserType } from '../../model/enums/user-type';
import type { User } from '../../model/types/user';
import { GlobalStylesProvider } from '../global-styles-provider';
import { DateTime } from 'luxon';
import { Actions } from '@/model/enums/actions';

const meta: Meta<typeof Progress> = {
  component: Progress,
};

export default meta;

type Story = StoryObj<typeof Progress>;

export const DaysLeftChallenge: Story = {
  render: () => {
    const user: User = {
      uid: '123',
      email: 'challenger1@example.com',
      name: 'Challenger1',
      avatar: 1,
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
    };
    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={{ user }}>
          <Progress />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};

export const NoDaysLeftChallenge: Story = {
  render: () => {
    const user: User = {
      uid: '456',
      email: 'challenger2@example.com',
      name: 'Challenger2',
      avatar: 2,
      type: UserType.Challenger,
      completedActions: {
        sharedChallenge: true,
        electionReminders: false,
        registerToVote: true,
      },
      badges: [
        { action: Actions.VoterRegistration },
        { action: Actions.SharedChallenge },
        { playerName: 'Player', playerAvatar: 1 },
      ],
      challengeEndDate: DateTime.now().toFormat('MM-dd-yyyy'),
      completedChallenge: false,
      redeemedAward: false,
    };
    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={{ user }}>
          <Progress />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};

export const CompletedChallenge: Story = {
  render: () => {
    const user: User = {
      uid: '789',
      email: 'challenger3@example.com',
      name: 'Challenger3',
      avatar: 3,
      type: UserType.Challenger,
      completedActions: {
        sharedChallenge: true,
        electionReminders: true,
        registerToVote: true,
      },
      badges: [
        { action: Actions.VoterRegistration },
        { action: Actions.SharedChallenge },
        { playerName: 'Player1', playerAvatar: 1 },
        { playerName: 'Player2', playerAvatar: 2 },
        { playerName: 'Player3', playerAvatar: 3 },
        { playerName: 'Player4', playerAvatar: 4 },
        { playerName: 'Player5', playerAvatar: 1 },
        { playerName: 'Player6', playerAvatar: 2 },
      ],
      challengeEndDate: DateTime.now().toFormat('MM-dd-yyyy'),
      completedChallenge: true,
      redeemedAward: true,
    };
    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={{ user }}>
          <Progress />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};
