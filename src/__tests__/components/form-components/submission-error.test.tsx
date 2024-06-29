import { render, screen, cleanup } from '@testing-library/react';
import { SubmissionError } from '@/components/form-components/submission-error';

describe('SubmissionError', () => {
  afterEach(cleanup);

  it(`renders an alert which contains the provided text.`, () => {
    const errorMessage = 'Oops. Something went wrong.';

    render(<SubmissionError text={errorMessage} />);

    const alert = screen.getByRole('alert');
    expect(alert.textContent).toBe(errorMessage);
  });
});
