import { Avatar } from './avatar';

/**
 * Represents data about a challenger that is stored in a player's user document.
 */
export interface Challenger {
  uid: string;
  name: string;
  avatar: Avatar;
}
