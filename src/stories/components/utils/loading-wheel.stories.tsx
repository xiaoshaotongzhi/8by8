import { Meta, StoryObj } from '@storybook/react';
import { LoadingWheel } from '@/components/utils/loading-wheel';

const meta: Meta<typeof LoadingWheel> = {
  component: LoadingWheel,
};

export default meta;

type Story = StoryObj<typeof LoadingWheel>;

export const Default: Story = {
  render: LoadingWheel,
};
