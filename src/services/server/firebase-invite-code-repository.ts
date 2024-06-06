import 'server-only';
import { injectable, inject } from 'inversify';
import { nanoid } from 'nanoid';
import { AbstractInviteCodeRepository } from './abstract-invite-code-repository';
import { SERVER_SERVICE_KEYS } from './server-service-keys';
import { z } from 'zod';
import type { AbstractFirebaseAdminService } from './abstract-firebase-admin-service';

/**
 * An implementation of {@link AbstractInviteCodeRepository} that persists data in
 * a Firebase Firestore database.
 */
@injectable()
export class FirebaseInviteCodeRepository extends AbstractInviteCodeRepository {
  private inviteCodeSchema = z.object({
    userId: z.string(),
  });

  public constructor(
    @inject(SERVER_SERVICE_KEYS.FirebaseAdminService)
    private firebaseAdmin: AbstractFirebaseAdminService,
  ) {
    super();
  }

  public async createInviteCodeWithUserId(userId: string): Promise<string> {
    const inviteCode = nanoid();

    await this.firebaseAdmin.firestore
      .collection('invite-codes')
      .doc(inviteCode)
      .set({
        userId,
      });

    return inviteCode;
  }

  public async getUserIdFromInviteCode(inviteCode: string): Promise<string> {
    const inviteCodeDocSnap = await this.firebaseAdmin.firestore
      .collection('invite-codes')
      .doc(inviteCode)
      .get();

    const inviteCodeData = inviteCodeDocSnap.data();

    if (!inviteCodeData) {
      throw new Error('Invite code not found.');
    }

    const parsedInviteCodeData = this.inviteCodeSchema.parse(inviteCodeData);

    return parsedInviteCodeData.userId;
  }
}
