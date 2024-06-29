import styles from './styles.module.scss';
import Image from 'next/image';

interface NumberBadgeProps {
  index: number;
}

/**
 * Renders a component to display a number badge
 *
 * @param index - Index number of badge
 *
 * @returns A React component that displays just the badge number
 */
export function NumberBadge({ index }: NumberBadgeProps): JSX.Element {
  return (
    <div className={styles.badges}>
      <div className={styles.blob}>
        <Image
          alt="number badge background blob"
          className={styles.disable}
          src={require(
            `../../../../public/static/images/pages/progress/badge-${index}-blob.png`,
          )}
        />
      </div>
      <div className={styles.blob_content}>
        <p className={styles.index}>{index}</p>
      </div>
    </div>
  );
}
