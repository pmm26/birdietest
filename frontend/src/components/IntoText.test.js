import { render, screen } from '@testing-library/react';
import InfoText from './InfoText';

describe('InfoText component', () => {
  test('renders valued capitalized', () => {
    render(<InfoText value="example" />);

    const valueElement = screen.getByText('Example');
    expect(valueElement).toBeInTheDocument();
  });


  test('renders boolean value true as Yes', () => {
    render(<InfoText value={true} title="Example Title" />);

    const titleElement = screen.getByText('Example title', { exact: false });
    expect(titleElement).toBeInTheDocument();

    const valueElement = screen.getByText('Yes');
    expect(valueElement).toBeInTheDocument();
  });

  test('renders boolean value false as No', () => {
    render(<InfoText value={false} title="Example title" />);

    const valueElement = screen.getByText('No');
    expect(valueElement).toBeInTheDocument();
  });

  test('renders empty string', () => {
    render(<InfoText value="" />);

    const valueElement = screen.getByText('None provided');
    expect(valueElement).toBeInTheDocument();
  });


  test('renders formatted date', () => {
    render(<InfoText date={true} value={'2019-05-12T22:06:34+01:00'} />);

    const valueElement = screen.getByText('12th May 2019, 10:06:34 pm');
    expect(valueElement).toBeInTheDocument();
  });


})
