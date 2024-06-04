import { AvatarRadio } from './avatar-radio';
import type { FieldOfType } from 'fully-formed';
import type { Avatar } from '@/model/types/avatar';
import styles from './styles.module.scss';

type SelectAvatarProps = {
  field: FieldOfType<Avatar>;
  isLoading: boolean;
};

/**
 * Takes in a field whose value is of type {@link Avatar} and returns a
 * radio group containing a button for each avatar.
 *
 * @remarks
 * If `isLoading` is true, all buttons it renders will be disabled.
 */
export function SelectAvatar({ field, isLoading }: SelectAvatarProps) {
  return (
    <fieldset
      role="radiogroup"
      className={styles.radio_group}
      aria-labelledby="legend"
    >
      <legend id="legend" className={styles.legend}>
        Which one&apos;s you?
      </legend>
      <div className={styles.radio_buttons}>
        <AvatarRadio field={field} avatar="0" disabled={isLoading} />
        <AvatarRadio field={field} avatar="1" disabled={isLoading} />
        <AvatarRadio field={field} avatar="2" disabled={isLoading} />
        <AvatarRadio field={field} avatar="3" disabled={isLoading} />
      </div>
    </fieldset>
  );
}
