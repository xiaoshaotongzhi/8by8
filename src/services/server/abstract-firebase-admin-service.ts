import 'server-only';
import { injectable } from 'inversify';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

/**
 * A service class that provides Firebase {@link Auth} and
 * {@link Firestore}.
 */
@injectable()
export abstract class AbstractFirebaseAdminService {
  public abstract auth: Auth;
  public abstract firestore: Firestore;
}
