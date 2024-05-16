import { BadgeComponent } from './badge';
import type { Badge } from '@/model/types/badge';
import styles from './styles.module.scss';

/**
 * Define Props for Badges component
 */
interface BadgesProps {
  badges: Badge[] | undefined;
}

/**
 * Renders a component to display all badges
 *
 * @param badges - Array of Badges
 *
 * @returns A React component displaying each badge
 *
 * @remarks
 * The array can hold a maximum of 8 badges and pops off badges if the length of the array is greater than 8.
 *
 * The array pushes empty Objects until the length of the array matches 8.
 */
export function Badges({ badges }: BadgesProps): JSX.Element {
  if (badges) {
    while (badges.length > 8) {
      badges.pop();
    }

    while (badges.length < 8) {
      badges.push({});
    }
  }

  return (
    <section className={styles.section_3}>
      {badges?.map((badge, index) => {
        return <BadgeComponent badge={badge} index={index + 1} key={index} />;
      })}
    </section>
  );
}
