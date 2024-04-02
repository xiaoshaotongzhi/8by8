import { Meta, StoryObj } from '@storybook/react';
import Why8by8 from '@/app/why8by8/page';
import { GlobalStylesProvider } from '../global-styles-provider';

const meta: Meta<typeof Why8by8> = {
  component: Why8by8,
};

export default meta;

type Story = StoryObj<typeof Why8by8>;

export const Default: Story = {
  render: () => {
    return (
      <GlobalStylesProvider>
        <Why8by8 />
      </GlobalStylesProvider>
    );
  },
};
