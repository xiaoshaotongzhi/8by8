import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react';
import { BadgeComponent } from '@/components/progress/badges';
import { Actions } from '@/model/enums/actions';

describe('SingleBadgeComponent', () => {
  afterEach(cleanup);
  it('renders default badge unchanged.', () => {
    const { container } = render(<BadgeComponent badge={{}} index={1} />);
    expect(container).toMatchSnapshot();
  });

  it('renders action badge unchanged.', () => {
    const { container } = render(
      <BadgeComponent
        badge={{ action: Actions.VoterRegistration }}
        index={2}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('renders avatar badge unchanged.', () => {
    const { container } = render(
      <BadgeComponent
        badge={{ playerName: 'Player', playerAvatar: 1 }}
        index={1}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
