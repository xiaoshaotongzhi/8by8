import { MockReactTurnstile } from '@/testing-utils/mock-react-turnstile';
import { getErrorThrownByComponent } from '@/testing-utils/get-error-thrown-by-component';

describe('MockReactTurnstile', () => {
  it(`throws an error if it does not receive a known dummy site key.`, () => {
    expect(
      getErrorThrownByComponent(<MockReactTurnstile sitekey="" />),
    ).toBeInstanceOf(Error);
  });
});
