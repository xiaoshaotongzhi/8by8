import styles from './styles.module.scss';

interface SubmissionErrorProps {
  /**
   * The error message to display.
   */
  text: string;
}

/**
 * Renders an error message at the top of a form. Use this to display an error
 * when a method such as `UserContext.signUpWithEmail` fails.
 *
 * @param props - {@link SubmissionErrorProps}
 */
export function SubmissionError({ text }: SubmissionErrorProps) {
  return (
    <div className={styles.error} role="alert">
      {text}
    </div>
  );
}
