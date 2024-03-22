import { BadgeType } from '../enums/badge-type.enum';

export type OwnActionBadgeDoc = {
  badgeType:
    | BadgeType.ElectionReminders
    | BadgeType.VoterRegistration
    | BadgeType.SharedChallenge;
};
