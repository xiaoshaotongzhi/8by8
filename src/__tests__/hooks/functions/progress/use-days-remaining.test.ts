import type { User } from '@/model/types/user';
import { useDaysRemaining } from '@/hooks/functions/progress/use-days-remaining';
import { DateTime } from 'luxon';

describe('useDaysRemaining', () => {
  it('should return 0 when user is null', () => {
    const result = useDaysRemaining(null);
    expect(result).toBe(0);
  });

  it('should return 0 when challengeEndDate is before current date', () => {
    const user: User = { challengeEndDate: '01-01-2024' };

    const result = useDaysRemaining(user);
    expect(result).toBe(0);
  });

  it('should return a positive number when challengeEndDate after current date', () => {
    const user: User = { challengeEndDate: '01-01-2025' };

    const result = useDaysRemaining(user);
    expect(result).toBeGreaterThan(0);
  });

  it('should return a 2 when challengeEndDate is two days after current date', () => {
    const date = DateTime.now().plus({ days: 2 }).toFormat('MM-dd-yyyy');
    const user: User = { challengeEndDate: date };

    const result = useDaysRemaining(user);
    expect(result).toBe(2);
  });
});
