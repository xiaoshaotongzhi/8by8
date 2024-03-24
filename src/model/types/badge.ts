import { Actions } from '../enums/actions';
import { Avatar } from './avatar.type';

/**
 * Represents a badge awarded to the user either through their own actions, or
 * due to an action taken by a player they invited.
 */
export type Badge =
  | {
      action: Actions;
    }
  | {
      playerName: string;
      playerAvatar: Avatar;
    };
