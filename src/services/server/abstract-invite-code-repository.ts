import 'server-only';
import { injectable } from 'inversify';

@injectable()
export abstract class AbstractInviteCodeRepository {
  public abstract createInviteCodeWithUserId(userId: string): Promise<string>;
  public abstract getUserIdFromInviteCode(inviteCode: string): Promise<string>;
}
