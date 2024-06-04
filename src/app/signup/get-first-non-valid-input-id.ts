import { ValidityUtils } from 'fully-formed';
import { SignUpForm } from './signup-form';

export function getFirstNonValidInputId({
  fields,
  groups,
}: InstanceType<typeof SignUpForm>): string | null {
  if (!ValidityUtils.isValid(fields.name)) {
    return fields.name.id;
  }
  if (!ValidityUtils.isValid(fields.email)) {
    return fields.email.id;
  }
  if (
    !ValidityUtils.isValid(fields.confirmEmail) ||
    !ValidityUtils.isValid(groups.emailGroup)
  ) {
    return fields.confirmEmail.id;
  }
  if (!ValidityUtils.isValid(fields.turnstileToken)) {
    return fields.turnstileToken.id;
  }

  return null;
}
