import type { ActionBadge } from './action-badge';
import type { PlayerBadge } from './player-badge';

/**
 * Represents a badge awarded to the user either through their own actions, or
 * due to an action taken by a player they invited.
 *
 * @remarks
 * The two actions that grant the challenger themselves a badge are registering
 * to vote and sharing the challenger. Signing up for election reminders does
 * not grant the user a badge.
 */
export type Badge = ActionBadge | PlayerBadge;
