import { useState, useEffect } from 'react';
import { DummySiteKeys } from '@/constants/dummy-site-keys';

interface ReactTurnstileProps {
  sitekey: string;
  onVerify?: (DUMMY_TOKEN: string) => void;
  onBeforeInteractive?: () => void;
  onExpire?: () => void;
  onError?: () => void;
  id?: string;
}

export const DUMMY_TOKEN = 'XXXX.DUMMY.TOKEN.XXXX';
export const CHALLENGE_BTN_TEST_ID = 'turnstile-challenge';
const TIMEOUT = 250;

/**
 * Mocks the behavior of the ReactTurnstile component so that the "runScripts"
 * JSDom config option does not have to be set to "dangerously."
 */
export function MockReactTurnstile({
  sitekey,
  onVerify,
  onBeforeInteractive,
  onExpire,
  onError,
  id,
}: ReactTurnstileProps) {
  const [showChallenge, setShowChallenge] = useState(false);

  useEffect(() => {
    let onResult: () => void;

    switch (sitekey) {
      case DummySiteKeys.ALWAYS_PASSES:
        onResult = () => onVerify && onVerify(DUMMY_TOKEN);
        break;
      case DummySiteKeys.ALWAYS_BLOCKS:
        onResult = () => onError && onError();
        break;
      case DummySiteKeys.FORCES_CHALLENGE:
        onResult = () => {
          onBeforeInteractive && onBeforeInteractive();
          setShowChallenge(true);
        };
        break;
      default:
        throw new Error(
          'A dummy site key must be passed to MockReactTurnstile.',
        );
    }

    setTimeout(() => {
      onResult();

      if (sitekey !== DummySiteKeys.FORCES_CHALLENGE) {
        setTimeout(() => {
          onExpire && onExpire();
        }, TIMEOUT);
      }
    }, TIMEOUT);
  }, [sitekey, onVerify, onError, onBeforeInteractive, onExpire]);

  return (
    <div id={id}>
      {showChallenge && (
        <button
          type="button"
          data-testid={CHALLENGE_BTN_TEST_ID}
          onClick={() => {
            onVerify && onVerify(DUMMY_TOKEN);
          }}
        ></button>
      )}
    </div>
  );
}
