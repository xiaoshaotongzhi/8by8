import { Meta, StoryObj } from '@storybook/react';
import { Header } from '../../components/header';
import { UserContext } from '../../contexts/user-context';
import { GlobalStylesProvider } from '../global-styles-provider';
import { UserType } from '../../model/enums/user-type';
import type { User } from '../../model/types/user';

const meta: Meta<typeof Header> = {
  component: Header,
};

export default meta;

type Story = StoryObj<typeof Header>;

export const UserIsSignedOut: Story = {
  render: () => (
    <GlobalStylesProvider>
      <UserContext.Provider value={{ user: null }}>
        <Header />
      </UserContext.Provider>
    </GlobalStylesProvider>
  ),
};

export const ChallengerIsSignedIn: Story = {
  render: () => {
    const user: User = {
      uid: '123',
      email: 'challenger@example.com',
      name: 'Challenger',
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
      completedActionForChallenger: false,
    };

    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={{ user }}>
          <Header />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};

export const PlayerIsSignedIn: Story = {
  render: () => {
    const user: User = {
      uid: '456',
      email: 'player@example.com',
      name: 'Player',
      avatar: 2,
      type: UserType.Player,
      completedActions: {
        sharedChallenge: false,
        electionReminders: false,
        registerToVote: false,
      },
      badges: [],
      challengeEndDate: '',
      completedChallenge: false,
      redeemedAward: false,
      completedActionForChallenger: false,
      invitedBy: {
        uid: '123',
        name: 'Challenger',
        avatar: 1,
      },
    };

    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={{ user }}>
          <Header />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};

export const HybridUserIsSignedIn: Story = {
  render: () => {
    const user: User = {
      uid: '456',
      email: 'hybrid@example.com',
      name: 'Hybrid',
      avatar: 3,
      type: UserType.Hybrid,
      completedActions: {
        sharedChallenge: false,
        electionReminders: false,
        registerToVote: false,
      },
      badges: [],
      challengeEndDate: '',
      completedChallenge: false,
      redeemedAward: false,
      completedActionForChallenger: false,
      invitedBy: {
        uid: '123',
        name: 'Challenger',
        avatar: 1,
      },
    };

    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={{ user }}>
          <Header />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};
