import 'server-only';
import { injectable } from 'inversify';

/**
 * A service class that handles data persistence for invite codes.
 *
 * @remarks
 * Each user has a unique invite code. In order to award a badge to a challenger,
 * server-side code can use that challenger's invite code to look up their
 * user id, which can then be used to retrieve and update their document.
 */
@injectable()
export abstract class AbstractInviteCodeRepository {
  public abstract createInviteCodeWithUserId(userId: string): Promise<string>;
  public abstract getUserIdFromInviteCode(inviteCode: string): Promise<string>;
}
