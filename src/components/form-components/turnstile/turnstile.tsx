import ReactTurnstile from 'react-turnstile';
import { useSubmitted } from 'fully-formed';
import { TurnstileTokenField } from './turnstile-token-field';
import { Messages } from '../messages';
import styles from './styles.module.scss';
import { DummySiteKeys } from '@/constants/dummy-site-keys';

interface TurnstileProps {
  /**
   * The field whose state will be controlled by the component.
   */
  field: TurnstileTokenField;
  /**
   * A public site key from Cloudflare. If omitted and `process.env.NODE_ENV` is
   * "development", a dummy site key that always passes will be used. Otherwise,
   * if omitted, the component will get the site key from
   * `process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
   *
   * This should be omitted when including the component in a page, but should
   * be supplied when testing the component.
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
 * If the `sitekey` prop is omitted and `process.env.NODE_ENV` is
 * "development", a dummy site key that always passes will be used. Otherwise,
 * if the site key was omitted, the component will get the site key from
 * `process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY`.
 *
 * The site key should be omitted when including the component in a page, but
 * should be supplied when testing the component.
 */
export function Turnstile({ field, sitekey }: TurnstileProps) {
  sitekey ??=
    process.env.NODE_ENV === 'development' ?
      DummySiteKeys.ALWAYS_PASSES
    : process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

  return (
    <div className={styles.center_content}>
      <div className={styles.content}>
        <ReactTurnstile
          id={field.id}
          sitekey={sitekey}
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
