import { render, cleanup } from '@testing-library/react';
import { mockDialogMethods } from '@/testing-utils/mock-dialog-methods';
import Home from '@/app/page';

describe('Home', () => {
  mockDialogMethods();
  afterEach(cleanup);

  it('renders homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
