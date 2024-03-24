import { Meta, StoryObj } from '@storybook/react';
import { Footer } from '../../components/footer';
import { PageContainer } from '../../components/utils/page-container';
import { GlobalStylesProvider } from '../global-styles-provider';

const meta: Meta<typeof Footer> = {
  component: Footer,
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  render: () => {
    return (
      <GlobalStylesProvider>
        <PageContainer>
          <Footer />
        </PageContainer>
      </GlobalStylesProvider>
    );
  },
};
