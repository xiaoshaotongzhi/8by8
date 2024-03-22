import { BadgeType } from '../enums/badge-type.enum';
import { Avatar } from './avatar.type';

export type InvitedPlayerActionBadgeDoc = {
  badgeType: BadgeType.InvitedPlayerAction;
  invitedPlayerName: string;
  invitedPlayerAvatar: Avatar;
};
