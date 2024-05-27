import { Actions } from '../enums/actions';

/**
 * Represents a badge awarded to the user either through their own actions
 */
export type ActionBadge = {
  action: Actions.VoterRegistration | Actions.SharedChallenge;
};
