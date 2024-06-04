import Image from 'next/image';
import { useValue, type FieldOfType } from 'fully-formed';
import { positionedAvatars } from './positioned-avatars';
import { avatarBackgrounds } from './avatar-backgrounds';
import { AVATARS } from '@/constants/avatars';
import type { Avatar } from '@/model/types/avatar';
import styles from './styles.module.scss';

type AvatarRadioProps = {
  field: FieldOfType<Avatar>;
  avatar: Avatar;
  disabled: boolean;
};

/**
 * Renders a visually hidden radio button whose label contains an image of the
 * avatar whose id is received as a prop.
 */
export function AvatarRadio({ field, avatar, disabled }: AvatarRadioProps) {
  const fieldValue = useValue(field);

  return (
    <div>
      <input
        type="radio"
        name={field.name}
        id={avatar}
        className={styles.radio_button}
        onChange={() => {
          field.setValue(avatar);
        }}
        checked={fieldValue === avatar}
        value={avatar}
        disabled={disabled}
      />
      <label
        className={styles.label}
        style={{
          backgroundImage: `url(${avatarBackgrounds[avatar].src})`,
        }}
        htmlFor={avatar}
      >
        <Image
          src={positionedAvatars[avatar]}
          alt={AVATARS[avatar].altText}
          className={styles.avatar}
        />
      </label>
    </div>
  );
}
