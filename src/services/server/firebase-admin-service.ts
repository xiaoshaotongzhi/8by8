import 'server-only';
import { injectable } from 'inversify';
import admin from 'firebase-admin';
import { getAuth, type Auth } from 'firebase-admin/auth';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';
import { AbstractFirebaseAdminService } from './abstract-firebase-admin-service';
import { z } from 'zod';

/**
 * An implementation of {@link AbstractFirebaseAdminService} that reads
 * Firebase credentials from a .env file, initializes a Firebase admin app, and
 * provides Firebase {@link Auth} and {@link Firestore} for the initialized app.
 */
@injectable()
export class FirebaseAdminService extends AbstractFirebaseAdminService {
  public auth: Auth;
  public firestore: Firestore;
  private projectId: string;
  private clientEmail: string;
  private privateKey: string;

  public constructor() {
    super();
    this.projectId = this.readProjectId();
    this.clientEmail = this.readClientEmail();
    this.privateKey = this.readAndFormatPrivateKey();
    this.init();
    this.auth = getAuth();
    this.firestore = getFirestore();
  }

  private init() {
    if (admin.apps.length > 0) {
      return;
    }

    admin.initializeApp({
      projectId: this.projectId,
      credential: this.getCredential(),
    });
  }

  private getCredential() {
    const serviceAccount = {
      projectId: this.projectId,
      clientEmail: this.clientEmail,
      privateKey: this.privateKey,
    };

    return admin.credential.cert(serviceAccount);
  }

  private readProjectId(): string {
    return z
      .string({
        message:
          'FirebaseAdminService could not read NEXT_PUBLIC_FIREBASE_PROJECT_ID from .env.',
      })
      .parse(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
  }

  private readClientEmail(): string {
    return z
      .string({
        message:
          'FirebaseAdminService could not read FIREBASE_CLIENT_EMAIL from .env.',
      })
      .parse(process.env.FIREBASE_CLIENT_EMAIL);
  }

  private readAndFormatPrivateKey(): string {
    const privateKey = z
      .string({
        message:
          'FirebaseAdminService could not read FIREBASE_PRIVATE_KEY from .env.',
      })
      .parse(process.env.FIREBASE_PRIVATE_KEY);
    return this.formatPrivateKey(privateKey);
  }

  private formatPrivateKey(privateKey: string): string {
    return privateKey.replace(/\\n/g, '\n');
  }
}
