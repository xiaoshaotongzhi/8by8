import type { Badge } from '@/model/types/badge';
import type { Avatar } from '@/model/types/avatar.type';
import { Actions } from '@/model/enums/actions';
import styles from './styles.module.scss';
import Image from 'next/image';

/**
 * Define Props for Badge component
 */
interface BadgeComponentProps {
  badge: Badge;
  index: number;
}

/**
 * Renders a component to display a badge
 *
 * @param badge - Component's badge data
 *
 * @param index - Index number of badge
 *
 * @returns A React component based on badge's data
 */
export function BadgeComponent({
  badge,
  index,
}: BadgeComponentProps): JSX.Element {
  let name: string | null = null;
  let icon: Avatar | null = null;
  let action: string | null = null;

  if ('playerName' in badge && 'playerAvatar' in badge) {
    name = badge.playerName;
    icon = badge.playerAvatar;
  } else if ('action' in badge) {
    if (badge.action == Actions.VoterRegistration) {
      name = 'You Registered';
      action = 'register-to-vote';
    } else if (badge.action == Actions.SharedChallenge) {
      name = 'You Shared';
      action = 'shared-challenge';
    }
  }

  return (
    <div className={styles.badges}>
      <div className={styles.blob}>
        <Image
          alt="player badge background blob"
          className={
            icon || action ?
              `${styles.blob_img} ${styles['blob_img_' + index]}`
            : styles.disable
          }
          src={require(
            `../../../../public/static/images/pages/progress/badge-${index}-blob.png`,
          )}
        />
      </div>
      <div className={styles.blob_content}>
        {icon ?
          <Image
            alt="player badge icon"
            className={styles.icon}
            src={require(
              `../../../../public/static/images/shared/avatars/avatar-${icon}.svg`,
            )}
          />
        : action ?
          <Image
            alt="action badge icon"
            className={styles.icon}
            src={require(
              `../../../../public/static/images/pages/progress/${action}-badge-icon.svg`,
            )}
          />
        : <p className={styles.index}>{index}</p>}
        {name ?
          <h3>{name}</h3>
        : <></>}
      </div>
    </div>
  );
}
