import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Favorites from './Favorites';

describe('Favorites component', () => {
  const mockRenderItem = jest.fn();
  const mockSortButtonPress = jest.fn();

  const mockData = [
    { id: 1, name: 'Repository 1' },
    { id: 2, name: 'Repository 2' },
    { id: 3, name: 'Repository 3' },
  ];

  it('renders the component correctly with loading state', () => {
    const { getByTestId } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={[]}
        onSortButtonPress={mockSortButtonPress}
        isLoading={true}
      />
    );

    expect(getByTestId('favorites-loading')).toBeDefined();
    expect(getByTestId('sort-button')).toBeDefined();
  });

  it('renders the component correctly with empty data', () => {
    const { getByTestId, getByText } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={[]}
        onSortButtonPress={mockSortButtonPress}
        isLoading={false}
      />
    );

    expect(getByTestId('favorites-empty')).toBeDefined();
    expect(getByTestId('sort-button')).toBeDefined();
    expect(getByText('No Favorites, search to add some repositories!')).toBeDefined();
  });

  it('renders the component correctly with data', () => {
    const { getByTestId } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={mockData}
        onSortButtonPress={mockSortButtonPress}
        isLoading={false}
      />
    );

    expect(getByTestId('favorites-list')).toBeDefined();
    expect(getByTestId('sort-button')).toBeDefined();
  });

  it('calls onSortButtonPress when sort button is pressed', () => {
    const { getByTestId } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={mockData}
        onSortButtonPress={mockSortButtonPress}
        isLoading={false}
      />
    );

    const sortButton = getByTestId('sort-button');
    fireEvent.press(sortButton);
    expect(mockSortButtonPress).toHaveBeenCalledTimes(1);
  });

  it('renders the data correctly in the FlatList', () => {

    const { getByTestId } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={mockData}
        onSortButtonPress={mockSortButtonPress}
        isLoading={false}
      />
    );

    const flatList = getByTestId('favorites-list');
    const renderedData = flatList.props.data;

    expect(renderedData).toEqual(mockData);
  });

  it('verifies the styles of the loading state', () => {
    const { getByTestId } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={[]}
        onSortButtonPress={mockSortButtonPress}
        isLoading={true}
      />
    );


    const favoritesLoading = getByTestId('favorites-loading')

    expect(favoritesLoading.props.style.height).toBe(500);
    expect(favoritesLoading.props.style.justifyContent).toBe('center');
    expect(favoritesLoading.props.style.alignItems).toBe('center');

  });

  it('verifies the styles of the empty state', () => {
    const { getByTestId } = render(
      <Favorites
        renderItem={mockRenderItem}
        data={[]}
        onSortButtonPress={mockSortButtonPress}
        isLoading={false}
      />
    );


    const favoritesLoading = getByTestId('favorites-empty')

    expect(favoritesLoading.props.style.height).toBe(500);
    expect(favoritesLoading.props.style.justifyContent).toBe('center');
    expect(favoritesLoading.props.style.alignItems).toBe('center');

  });


});