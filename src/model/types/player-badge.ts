import { Avatar } from './avatar.type';

/**
 * Represents a badge awarded to the user due to an action taken by a player they invited.
 */
export type PlayerBadge = {
  playerName: string;
  playerAvatar: Avatar;
};