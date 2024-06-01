import { pendingValidation } from './pending-validation';

/**
 * An error thrown when {@link pendingValidation} fails.
 */
export class FormInvalidError extends Error {
  public readonly name = 'FormInvalidError';
  public readonly message: string;

  public constructor() {
    super();
    this.message = 'The form has invalid fields.';
  }
}
