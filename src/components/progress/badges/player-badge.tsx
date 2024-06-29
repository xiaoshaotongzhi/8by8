import type { PlayerBadge } from '@/model/types/player-badge';
import type { Avatar } from '@/model/types/avatar';
import styles from './styles.module.scss';
import Image from 'next/image';

interface PlayerBadgeProps {
  badge: PlayerBadge;
  index: number;
}

/**
 * Renders a component to display a player badge
 *
 * @param badge - Component's badge data
 *
 * @param index - Index number of badge
 *
 * @returns A React component that displays a badge of a player's name and icon
 */
export function PlayerBadge({ badge, index }: PlayerBadgeProps): JSX.Element {
  let name: string | null = null;
  let icon: Avatar | null = null;

  name = badge.playerName;
  icon = badge.playerAvatar;

  return (
    <div className={styles.badges}>
      <div className={styles.blob}>
        <Image
          alt="player badge background blob"
          className={`${styles.blob_img} ${styles['blob_img_' + index]}`}
          src={require(
            `../../../../public/static/images/pages/progress/badge-${index}-blob.png`,
          )}
        />
      </div>
      <div className={styles.blob_content}>
        <Image
          alt="player badge icon"
          className={styles.icon}
          src={require(
            `../../../../public/static/images/shared/avatars/avatar-${icon}.svg`,
          )}
        />
        <h3>{name}</h3>
      </div>
    </div>
  );
}
