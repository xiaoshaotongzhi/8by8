import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { LocalUserContextProvider, UserContext } from '@/contexts/user-context';
import { UserType } from '@/model/enums/user-type';
import { IDBFactory } from 'fake-indexeddb';
import { useContextSafely } from '@/hooks/functions/use-context-safely';
import { IDBConnection } from '@/utils/idb-connection';
import { useEffect, useRef, useState } from 'react';
import { getErrorThrownByComponent } from '@/testing-utils/get-error-thrown-by-component';

describe('LocalUserContextProvider', () => {
  let db: IDBConnection;
  beforeEach(async () => {
    db = await IDBConnection.createConnection('8by8', 1, 'users', 'email');
  });

  afterEach(() => {
    cleanup();
    db.close();
    indexedDB = new IDBFactory();
  });

  it('successfully signs up a new user with valid data', async () => {
    function SignUpButton() {
      const { user, signUpWithEmail } = useContextSafely(
        UserContext,
        'SignUpButton',
      );

      return user ?
          <h1>Welcome, {user.name}!</h1>
        : <button
            onClick={() => {
              signUpWithEmail(
                'user@example.com',
                'user',
                '0',
                UserType.Challenger,
              );
            }}
          >
            Sign Up
          </button>;
    }

    const user = userEvent.setup();

    render(
      <LocalUserContextProvider>
        <SignUpButton />
      </LocalUserContextProvider>,
    );

    const signUpButton = screen.getByText('Sign Up');
    await user.click(signUpButton);
    await waitFor(() =>
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument(),
    );
    const appUser = await db.read('user@example.com');

    expect(appUser).toStrictEqual({
      email: 'user@example.com',
      name: 'user',
      avatar: '0',
      type: UserType.Challenger,
      uid: 'unique-id-here',
      completedActions: {
        electionReminders: false,
        registerToVote: false,
        sharedChallenge: false,
      },
      badges: [],
      challengeEndDate: expect.any(String),
      completedChallenge: false,
      redeemedAward: false,
      contributedTo: [],
      shareCode: 'default-share-code',
    });
  });

  it(`throws an error when signUpWithEmail() is called with an email that 
  already exists in the database.`, async () => {
    const existingEmail = 'user@example.com';
    await db.create({
      email: existingEmail,
      name: 'user',
      avatar: '0',
      type: UserType.Challenger,
      uid: 'unique-id-here',
      completedActions: {
        electionReminders: false,
        registerToVote: false,
        sharedChallenge: false,
      },
      badges: [],
      challengeEndDate: '',
      completedChallenge: false,
      redeemedAward: false,
      contributedTo: [],
      shareCode: 'default-share-code',
    });

    function SignUpWithExistingEmail() {
      const { signUpWithEmail } = useContextSafely(
        UserContext,
        'SignInWithInvalidEmail',
      );
      const [errorMessage, setErrorMessage] = useState('');

      return (
        <>
          <div>{errorMessage}</div>
          <button
            onClick={async () => {
              try {
                await signUpWithEmail(
                  existingEmail,
                  'user',
                  '0',
                  UserType.Challenger,
                );
              } catch (e) {
                if (e instanceof Error) {
                  setErrorMessage(e.message);
                }
              }
            }}
          >
            Sign Up
          </button>
        </>
      );
    }

    const user = userEvent.setup();
    render(
      <LocalUserContextProvider>
        <SignUpWithExistingEmail />
      </LocalUserContextProvider>,
    );

    const signUpButton = screen.getByText('Sign Up');
    await user.click(signUpButton);
    await waitFor(() =>
      expect(
        screen.queryByText(`User with email ${existingEmail} already exists.`),
      ).toBeInTheDocument(),
    );
  });

  it('successfully signs in an existing user with valid email', async () => {
    await db.create({
      email: 'user@example.com',
      name: 'user',
      avatar: '0',
      type: UserType.Challenger,
      uid: 'unique-id-here',
      completedActions: {
        electionReminders: false,
        registerToVote: false,
        sharedChallenge: false,
      },
      badges: [],
      challengeEndDate: '',
      completedChallenge: false,
      redeemedAward: false,
      contributedTo: [],
      shareCode: 'default-share-code',
    });

    function SignInButton() {
      const { signInWithEmail, user } = useContextSafely(
        UserContext,
        'SignInButton',
      );
      const signInCalled = useRef(false);

      useEffect(() => {
        if (!signInCalled.current) {
          expect(user).toBe(null);
        } else {
          expect(user).toStrictEqual({
            email: 'user@example.com',
            name: 'user',
            avatar: '0',
            type: UserType.Challenger,
            uid: 'unique-id-here',
            completedActions: {
              electionReminders: false,
              registerToVote: false,
              sharedChallenge: false,
            },
            badges: [],
            challengeEndDate: expect.any(String),
            completedChallenge: false,
            redeemedAward: false,
            contributedTo: [],
            shareCode: 'default-share-code',
          });
        }
      }, [user]);

      return (
        <button
          onClick={() => {
            signInCalled.current = true;
            signInWithEmail('user@example.com');
          }}
        >
          Sign In
        </button>
      );
    }

    const user = userEvent.setup();
    render(
      <LocalUserContextProvider>
        <SignInButton />
      </LocalUserContextProvider>,
    );

    const signUpButton = screen.getByText('Sign In');
    await user.click(signUpButton);
  });

  it('throws an error when signing in with an invalid email', async () => {
    const invalidEmail = 'nonexistent@example.com';
    const count = await db.count(invalidEmail);
    expect(count).toBe(0);

    function SignInWithInvalidEmail() {
      const { signInWithEmail } = useContextSafely(
        UserContext,
        'SignInWithInvalidEmail',
      );
      const [errorMessage, setErrorMessage] = useState('');

      return (
        <>
          <div data-testid="error">{errorMessage}</div>
          <button
            onClick={async () => {
              try {
                await signInWithEmail(invalidEmail);
              } catch (e) {
                if (e instanceof Error) {
                  setErrorMessage(e.message);
                }
              }
            }}
          >
            Sign In
          </button>
        </>
      );
    }

    const user = userEvent.setup();
    render(
      <LocalUserContextProvider>
        <SignInWithInvalidEmail />
      </LocalUserContextProvider>,
    );

    const signInButton = screen.getByText('Sign In');
    await user.click(signInButton);
    await waitFor(() =>
      expect(
        screen.queryByText(`User with email ${invalidEmail} does not exist.`),
      ).toBeInTheDocument(),
    );
  });

  it('successfully signs out a signed-in user', async () => {
    function SignUpSignOut() {
      const { user, signUpWithEmail, signOut } = useContextSafely(
        UserContext,
        'SignUpButton',
      );

      return user ?
          <button onClick={signOut}>Sign Out</button>
        : <button
            onClick={() => {
              signUpWithEmail(
                'user@example.com',
                'user',
                '0',
                UserType.Challenger,
              );
            }}
          >
            Sign Up
          </button>;
    }

    const user = userEvent.setup();

    render(
      <LocalUserContextProvider>
        <SignUpSignOut />
      </LocalUserContextProvider>,
    );

    const signUpButton = screen.getByText('Sign Up');
    await user.click(signUpButton);
    await waitFor(() =>
      expect(screen.queryByText('Sign Up')).not.toBeInTheDocument(),
    );

    const signOutButton = screen.getByText('Sign Out');
    await user.click(signOutButton);
    await waitFor(() =>
      expect(screen.queryByText('Sign Out')).not.toBeInTheDocument(),
    );
  });

  it('throws an error when restartChallenge() is called.', () => {
    function RestartChallenge() {
      const { restartChallenge } = useContextSafely(
        UserContext,
        'SignUpButton',
      );

      useEffect(() => {
        restartChallenge();
      }, [restartChallenge]);

      return null;
    }

    const error = getErrorThrownByComponent(
      <LocalUserContextProvider>
        <RestartChallenge />
      </LocalUserContextProvider>,
    );

    expect(error).toBeTruthy();
    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe('Method not implemented.');
  });
});
