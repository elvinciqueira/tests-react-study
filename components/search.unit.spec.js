import Search from './search';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const doSearch = jest.fn();

const renderSearchComponent = () => render(<Search doSearch={doSearch} />);

describe('Search', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render a form', () => {
    renderSearchComponent();

    expect(screen.getByRole('form')).toBeInTheDocument();
  });

  it('should render a input type equals search', () => {
    renderSearchComponent();

    expect(screen.getByRole('searchbox')).toHaveProperty('type', 'search');
  });

  it('should call props.doSearch() when form is submitted', async () => {
    renderSearchComponent();

    const form = screen.getByRole('form');
    
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledTimes(1);
  });

  it('should call props.doSearch() with the user input', async () => {
    renderSearchComponent();
    
    const inputText = 'some text';
    const form = screen.getByRole('form');
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await fireEvent.submit(form);

    expect(doSearch).toHaveBeenCalledWith(inputText);
  });

  it('should call doSearch when search input is cleared', async () => {
    renderSearchComponent();    
    
    const inputText = 'some text';
    const input = screen.getByRole('searchbox');

    await userEvent.type(input, inputText);
    await userEvent.clear(input);

    expect(doSearch).toHaveBeenCalledTimes(1);
    expect(doSearch).toHaveBeenCalledWith('');
  });
});