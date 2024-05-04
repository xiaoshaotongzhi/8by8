import { RewardsContext, RewardsContextProvider } from '@/contexts/rewards-context';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { useContext } from 'react';

function MockChildComponent() {
  const {rewards} = useContext(RewardsContext);
  return (
    <div data-testid="test">{rewards.length > 0 ? rewards[0].name : "your friend"}</div>
  );
}

describe('RewardsContextProvider', () => {
  afterEach(cleanup);

  it('defaults to an rewardsInfo value of an empty array.', () => {
    render(
      <RewardsContextProvider>
        <MockChildComponent />
      </RewardsContextProvider>
    );
    const noRewards = screen.queryByTestId('test');
    expect(noRewards).toHaveTextContent('your friend');
  });
});