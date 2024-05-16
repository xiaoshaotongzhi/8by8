import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ChallengeButton } from '@/components/progress/challenge-button';

describe('ChallengeComplete', () => {
  afterEach(cleanup);
  const toggleInvite = { current: jest.fn() };
  const restartChallenge = jest.fn();
  const setOpenModal = jest.fn();

  it('renders a Invite friends button as default invokes toggleInvite when clicked.', () => {
    const user = { completedChallenge: false };
    const daysLeft = 2;
    render(
      <ChallengeButton
        user={user}
        daysLeft={daysLeft}
        toggleInvite={toggleInvite}
        restartChallenge={restartChallenge}
        setOpenModal={setOpenModal}
      />,
    );

    expect(screen.getByText('Invite friends')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Invite friends'));
    expect(toggleInvite.current).toHaveBeenCalled();
  });

  it('renders a Share button when challenge is completed and invokes toggleInvite when clicked.', () => {
    const user = { completedChallenge: true };
    const daysLeft = 0;
    render(
      <ChallengeButton
        user={user}
        daysLeft={daysLeft}
        toggleInvite={toggleInvite}
        restartChallenge={restartChallenge}
        setOpenModal={setOpenModal}
      />,
    );

    expect(screen.getByText('Share')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Share'));
    expect(toggleInvite.current).toHaveBeenCalled();
  });

  it('renders a Restart Challenge button when challenge is not completed and daysLeft is 0.', () => {
    const user = { completedChallenge: false };
    const daysLeft = 0;
    render(
      <ChallengeButton
        user={user}
        daysLeft={daysLeft}
        toggleInvite={toggleInvite}
        restartChallenge={restartChallenge}
        setOpenModal={setOpenModal}
      />,
    );

    expect(screen.getByText('Restart Challenge')).toBeInTheDocument();
  });

  it('invokes restartChallenge, and setOpenModal when Restart Challenge button is clicked.', () => {
    const user = { completedChallenge: false };
    const daysLeft = 0;
    render(
      <ChallengeButton
        user={user}
        daysLeft={daysLeft}
        toggleInvite={toggleInvite}
        restartChallenge={restartChallenge}
        setOpenModal={setOpenModal}
      />,
    );

    fireEvent.click(screen.getByText('Restart Challenge'));
    expect(restartChallenge).toHaveBeenCalled();
    expect(setOpenModal).toHaveBeenCalled();
  });

  it('sets button to an Invite friends button when Restart Challenge button is clicked and invokes toggleInvite when Invite friends button is clicked.', () => {
    const user = { completedChallenge: false };
    const daysLeft = 0;
    render(
      <ChallengeButton
        user={user}
        daysLeft={daysLeft}
        toggleInvite={toggleInvite}
        restartChallenge={restartChallenge}
        setOpenModal={setOpenModal}
      />,
    );

    fireEvent.click(screen.getByText('Restart Challenge'));
    expect(screen.getByText('Invite friends')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Invite friends'));
    expect(toggleInvite.current).toHaveBeenCalled();
  });
});