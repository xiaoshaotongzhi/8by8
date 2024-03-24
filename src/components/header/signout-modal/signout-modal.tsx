import { useContextSafely } from '../../../hooks/functions/use-context-safely';
import { HeaderContext } from '../header-context';
import { Modal } from '../../utils/modal';
import styles from './styles.module.scss';

export function SignoutModal() {
  const { isSignoutModalShown, closeSignoutModal } = useContextSafely(
    HeaderContext,
    'SignoutModal',
  );

  return (
    <Modal
      ariaLabel="Are you sure you want to sign out?"
      theme="dark"
      isOpen={isSignoutModalShown}
      closeModal={closeSignoutModal}
    >
      <p className="b1">Are you sure you want to sign out?</p>
      <button className={styles.btn_top} onClick={closeSignoutModal}>
        <span>Yes, but I&apos;ll be back</span>
      </button>
      <button className={styles.btn_bottom} onClick={closeSignoutModal}>
        <span>No, I think I&apos;ll stay</span>
      </button>
    </Modal>
  );
}
