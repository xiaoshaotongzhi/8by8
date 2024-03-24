import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Modal } from '../../../../components/utils/modal';
import { GlobalStylesProvider } from '../../../global-styles-provider';

const meta: Meta<typeof Modal> = {
  component: Modal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Modal>;

export const DarkTheme: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <GlobalStylesProvider>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          ariaLabel="dark theme modal"
          theme="dark"
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        >
          Dark Theme Modal
        </Modal>
      </GlobalStylesProvider>
    );
  },
};

export const LightTheme: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <GlobalStylesProvider>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          ariaLabel="light theme modal"
          theme="light"
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        >
          Light Theme Modal
        </Modal>
      </GlobalStylesProvider>
    );
  },
};
