import { startConfettiTimer } from '@/hooks/functions/progress/start-confetti-timer';

describe('startConfettiTimer', () => {
  it('should setShowConfetti to false after delay.', async () => {
    const setShowConfetti = jest.fn();
    await startConfettiTimer(2000, setShowConfetti);
    expect(setShowConfetti).toHaveBeenCalledWith(false);
  });
});
