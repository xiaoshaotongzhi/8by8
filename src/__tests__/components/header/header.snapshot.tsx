import { render, cleanup } from '@testing-library/react';
import { Header } from '@/components/header';
import { UserContext } from '@/contexts/user-context';
import { mockDialogMethods } from '@/testing-utils/mock-dialog-methods';

describe('Header', () => {
  mockDialogMethods();
  afterEach(cleanup);

  it('renders the header unchanged', () => {
    const { container } = render(
      <UserContext.Provider value={{ user: null }}>
        <Header />
      </UserContext.Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
