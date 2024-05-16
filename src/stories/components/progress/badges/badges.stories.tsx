import { Meta, StoryObj } from '@storybook/react';
import { GlobalStylesProvider } from '@/stories/global-styles-provider';
import { BadgeComponent } from '@/components/progress/badges';
import { Badges } from '@/components/progress/badges';
import type { Badge } from '@/model/types/badge';
import { Actions } from '@/model/enums/actions';

const meta: Meta<typeof Badges> = {
  component: Badges,
};

export default meta;

type Story = StoryObj<typeof Badges>;

export const SingleBadge: Story = {
  render: () => {
    const badge: Badge = {};

    return (
      <GlobalStylesProvider>
        <BadgeComponent badge={badge} index={1} />
      </GlobalStylesProvider>
    );
  },
};

export const AllBadges: Story = {
  render: () => {
    const badges: Badge[] = [
      { action: Actions.VoterRegistration },
      { action: Actions.SharedChallenge },
      { playerName: 'test', playerAvatar: 1 },
    ];
    return (
      <GlobalStylesProvider>
        <Badges badges={badges} />
      </GlobalStylesProvider>
    );
  },
};
