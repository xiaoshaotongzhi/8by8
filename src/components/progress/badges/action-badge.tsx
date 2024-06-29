import type { ActionBadge } from '@/model/types/action-badge';
import { Actions } from '@/model/enums/actions';
import styles from './styles.module.scss';
import Image from 'next/image';

interface ActionBadgeProps {
  badge: ActionBadge;
  index: number;
}

/**
 * Renders a component to display a action badge
 *
 * @param badge - Component's badge data
 *
 * @param index - Index number of badge
 *
 * @returns A React component that displays either a registered or shared action badge
 */
export function ActionBadge({ badge, index }: ActionBadgeProps): JSX.Element {
  let label: string | null = null;
  let action: string | null = null;

  if (badge.action === Actions.VoterRegistration) {
    label = 'You Registered';
    action = 'register-to-vote';
  } else if (badge.action === Actions.SharedChallenge) {
    label = 'You Shared';
    action = 'shared-challenge';
  }

  return (
    <div className={styles.badges}>
      <div className={styles.blob}>
        <Image
          alt="action badge background blob"
          className={`${styles.blob_img} ${styles['blob_img_' + index]}`}
          src={require(
            `../../../../public/static/images/pages/progress/badge-${index}-blob.png`,
          )}
        />
      </div>
      <div className={styles.blob_content}>
        <Image
          alt="action badge icon"
          className={styles.icon}
          src={require(
            `../../../../public/static/images/pages/progress/${action}-badge-icon.svg`,
          )}
        />
        <h3>{label}</h3>
      </div>
    </div>
  );
}
