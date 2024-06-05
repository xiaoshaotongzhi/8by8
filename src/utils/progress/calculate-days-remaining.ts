import { DateTime } from 'luxon';
import type { User } from '@/model/types/user';

// Probably best to store datetime in millis, TZ differences can be weird
// between server and client otherwise

/**
 * Calculates the days remaining left in the challenge with a maximum of 8 days and returns 0 if user or user's end date is null.
 *
 * @param user - The user returned from UserContext.
 *
 * @returns - A number with a min of 0 and max of 8.
 *
 * @remarks
 * Expects a string in the format 'MM-dd-yyyy'. Others formats will return NaN
 *
 * @example
 * // Get user from UserContext
 * const { user } = useContextSafely(UserContext, 'UserContext');
 *
 * // Call hook to get days remaining in challenge for that user
 * const daysLeft = calculateDaysRemaining(user);
 */

export function calculateDaysRemaining(user: User | null): number {
  let daysLeft = 0;

  if (user && user.challengeEndDate) {
    const challengeEndDate = DateTime.fromFormat(
      user.challengeEndDate,
      'MM-dd-yyyy',
    );
    const currentDate = DateTime.now();

    const remainingDays = challengeEndDate.diff(currentDate, 'days').days;

    const floorDays = Math.max(0, Math.ceil(remainingDays));

    daysLeft = Math.min(floorDays, 8);
  }

  return daysLeft;
}
