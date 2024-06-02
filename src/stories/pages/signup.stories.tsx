import { Meta, StoryObj } from '@storybook/react';
import SignUp from '@/app/signup/page';
import { Builder } from 'builder-pattern';
import { UserContext, UserContextType } from '@/contexts/user-context';
import { GlobalStylesProvider } from '../global-styles-provider';

const meta: Meta<typeof SignUp> = {
  component: SignUp,
};

export default meta;

type Story = StoryObj<typeof SignUp>;

export const Default: Story = {
  render: () => {
    const userContextValue = Builder<UserContextType>()
      .signUpWithEmail(() => {
        throw new Error();
      })
      .build();

    return (
      <GlobalStylesProvider>
        <UserContext.Provider value={userContextValue}>
          <SignUp />
        </UserContext.Provider>
      </GlobalStylesProvider>
    );
  },
};
