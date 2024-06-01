import ReactTurnstile from 'react-turnstile';
import { useSubmitted } from 'fully-formed';
import { TurnstileTokenField } from './turnstile-token-field';
import { Messages } from '../messages';
import styles from './styles.module.scss';

interface TurnstileProps {
  /**
   * The field whose state will be controlled by the component.
   */
  field: TurnstileTokenField;
  /**
   * A public site key from Cloudflare. If omitted, it will get the site key
   * from the `NEXT_PUBLIC_TURNSTILE_SITE_KEY` env variable.
   *
   * This should be omitted when including the component in a page, but can be
   * included in order to pass various dummy keys to the component for testing.
   *
   * Dummy keys can be found at
   * {@link https://developers.cloudflare.com/turnstile/troubleshooting/testing/#dummy-sitekeys-and-secret-keys}.
   */
  sitekey?: string;
}

/**
 * Renders a Cloudflare Turnstile Captcha component. Accepts a field whose
 * state the component will control, and optionally, a site key.
 *
 * @param props - {@link TurnstileProps}
 *
 * @returns A Cloudflare Turnstile widget.
 *
 * @remarks
 * If omitted, the site key will come from the `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
 * env variable. The site key should be omitted when including this component in
 * a page, but can be included for the purpose of supplying dummy site keys for
 * testing.
 *
 * Dummy keys can be found at
 * {@link https://developers.cloudflare.com/turnstile/troubleshooting/testing/#dummy-sitekeys-and-secret-keys}.
 */
export function Turnstile({ field, sitekey }: TurnstileProps) {
  return (
    <div className={styles.center_content}>
      <div className={styles.content}>
        <ReactTurnstile
          id={field.id}
          sitekey={sitekey ?? process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
          onVerify={token => {
            field.onVerify(token);
          }}
          onBeforeInteractive={() => {
            field.onBeforeInteractive();
          }}
          onExpire={() => {
            field.onExpire();
          }}
          onError={() => {
            field.onError();
          }}
          refreshExpired="auto"
          fixedSize
        />
        <div className={styles.messages_wrapper}>
          <Messages
            messageBearers={[field]}
            containerClassName={styles.messages}
            hideMessages={!useSubmitted(field)}
          />
        </div>
      </div>
    </div>
  );
}
