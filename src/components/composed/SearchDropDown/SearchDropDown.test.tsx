import React from 'react';
import { render, fireEvent, waitFor, } from '@testing-library/react-native';
import SearchDropDown from './SearchDropDown';

describe('SearchDropDown component', () => {
  let mockRenderItem: jest.Mock;
  let mockOnChange: jest.Mock;

  const mockData = [
    { id: 1, name: 'Repository 1' },
    { id: 2, name: 'Repository 2' },
    { id: 3, name: 'Repository 3' },
  ];

  beforeEach(() => {
    mockRenderItem = jest.fn();
    mockOnChange = jest.fn();
  });

  it('renders the component correctly', () => {
    const { getByTestId, getByPlaceholderText } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={mockData}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeDefined();

  });

  it('renders the component correctly with empty data ', async () => {
    const { getByTestId, getByText } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={[]}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');

    fireEvent(searchInput, 'change', { nativeEvent: { text: 'Repository' } });

    await waitFor(() => {
      expect(getByTestId('no-results-found')).toBeDefined();
      expect(getByText('No Results Found')).toBeDefined();
    });


  });

  it('shows dropdown list when search input has text', async () => {
    const { getByTestId } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={mockData}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');

    fireEvent(searchInput, 'change', { nativeEvent: { text: 'Repository' } });

    await waitFor(() => {
      const dropdownList = getByTestId('dropdown-list');
      expect(dropdownList).toBeDefined();
    });


  });

  it('calls onChange prop when search input text changes', async () => {
    const { getByTestId } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={mockData}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');
    fireEvent(searchInput, 'change', { nativeEvent: { text: 'Repository' } });

    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledTimes(1);
      expect(mockOnChange).toHaveBeenCalledWith('Repository');
    });

  });


  it('verifies the styles of the container', async () => {

    const { getByTestId } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={[]}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('container');
    expect(searchInput.props.style.padding).toBe(20);
    expect(searchInput.props.style.zIndex).toBe(9999);

  });

  it('verifies the styles of the empty state', async () => {

    const { getByTestId } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={[]}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');
    fireEvent(searchInput, 'change', { nativeEvent: { text: 'Repository' } });

    await waitFor(() => {
      const noResultsFound = getByTestId('no-results-found');
      expect(noResultsFound.props.style.height).toBe(100);
      expect(noResultsFound.props.style.justifyContent).toBe('center');
      expect(noResultsFound.props.style.alignItems).toBe('center');
    });

  });

  it('verifies the styles of the TextInput', async () => {

    const { getByTestId } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={[]}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');
    expect(searchInput.props.style[0].width).toBe('100%');
    expect(searchInput.props.style[0].height).toBe(40);
    expect(searchInput.props.style[0].backgroundColor).toBe('#FFFFFF');
    expect(searchInput.props.style[0].fontSize).toBe(25);
    expect(searchInput.props.style[0].paddingHorizontal).toBe(10);
    expect(searchInput.props.style[0].borderWidth).toBe(1);

  });

  it('verifies the styles of the drop down list', async () => {

    const { getByTestId } = render(
      <SearchDropDown
        renderItem={mockRenderItem}
        data={mockData}
        onChange={mockOnChange}
      />
    );

    const searchInput = getByTestId('search-input');
    fireEvent(searchInput, 'change', { nativeEvent: { text: 'Repository' } });

    await waitFor(() => {
      const noResultsFound = getByTestId('dropdown-list');
      expect(noResultsFound.props.style.top).toBe(60);
      expect(noResultsFound.props.style.marginHorizontal).toBe(20);
      expect(noResultsFound.props.style.width).toBe('100%');
      expect(noResultsFound.props.style.backgroundColor).toBe('#FFFFFF');
      expect(noResultsFound.props.style.position).toBe('absolute');
      expect(noResultsFound.props.style.borderBottomLeftRadius).toBe(10);
      expect(noResultsFound.props.style.borderBottomRightRadius).toBe(10);
      expect(noResultsFound.props.style.borderLeftWidth).toBe(1);
      expect(noResultsFound.props.style.borderRightWidth).toBe(1);
      expect(noResultsFound.props.style.borderBottomWidth).toBe(1);
    });

  });

});
