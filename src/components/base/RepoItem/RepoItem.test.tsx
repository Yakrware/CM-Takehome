import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RepoItem from '../RepoItem'; // Change this to the path of your component

describe('RepoItem', () => {
  let footerButtonPressedMock: jest.Mock;
  const itemDataMock = {
    id: '12343498398',
    createdAt: 'Some Date',
    fullName: 'repo1',
    description: 'This is a test repo',
    language: 'JavaScript',
    stargazersCount: 100,
    url: 'https://github.com/'
  };

  beforeEach(() => {
    footerButtonPressedMock = jest.fn();
  });

  it('should render all labels correctly', () => {
    const { getByText } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    expect(getByText(`Name: ${itemDataMock.fullName}`)).toBeTruthy();
    expect(getByText(`Description: ${itemDataMock.description}`)).toBeTruthy();
    expect(getByText(`Language: ${itemDataMock.language}`)).toBeTruthy();
    expect(getByText(`Stars: ${itemDataMock.stargazersCount}`)).toBeTruthy();
    expect(getByText('+ Add To Favorites')).toBeTruthy();
  });

  it('should not render description when not provided', () => {
    const itemWithoutDescription = { ...itemDataMock, description: null };
    const { queryByText } = render(<RepoItem itemData={itemWithoutDescription} footerButtonPressed={footerButtonPressedMock} />);

    expect(queryByText(`Description: ${itemDataMock.description}`)).toBeNull();
  });

  it('should call footerButtonPressed when button is pressed', () => {
    const { getByText } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);
    fireEvent.press(getByText('+ Add To Favorites'));

    expect(footerButtonPressedMock).toHaveBeenCalledWith(itemDataMock);
  });

  it('should render correct footer button title when prop is provided', () => {
    const customTitle = 'Custom Title';
    const { getByText } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} footerButtonTitle={customTitle} />);

    expect(getByText(customTitle)).toBeTruthy();
  });

  it('should render correct number of lines for description', () => {
    const { getByText } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    const descriptionElement = getByText(`Description: ${itemDataMock.description}`);
    expect(descriptionElement.props.numberOfLines).toBe(2);
  });

  it('should use default props when none are provided', () => {
    // @ts-ignore
    const { getByText } = render(<RepoItem />);

    expect(getByText('+ Add To Favorites')).toBeTruthy();
  });

  it('verifies the styles of the list item', async () => {
    const { getByTestId } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    const listItem = getByTestId('list-item');

    expect(listItem.props.style.marginVertical).toBe(5);
    expect(listItem.props.style.marginHorizontal).toBe(10);
    expect(listItem.props.style.justifyContent).toBe('center');
    expect(listItem.props.style.borderRadius).toBe(5);
    expect(listItem.props.style.backgroundColor).toBe('rgba(0,0,0, 0.05)');
    expect(listItem.props.style.shadowColor).toBe('black');
    expect(listItem.props.style.borderWidth).toBe(1);

  });
  it('verifies the styles of the item container', async () => {
    const { getByTestId } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    const itemContainer = getByTestId('item-container');

    expect(itemContainer.props.style.margin).toBe(10);

  });
  it('verifies the styles of the description label', async () => {
    const { getByTestId } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    const descriptionLabel = getByTestId('description-label');

    expect(descriptionLabel.props.style.fontWeight).toBe('800');

  });

  it('verifies the styles of the footer', async () => {
    const { getByTestId } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    const footer = getByTestId('footer');

    expect(footer.props.style.alignItems).toBe('flex-end');
    expect(footer.props.style.justifyContent).toBe('center');
    expect(footer.props.style.borderTopWidth).toBe(1);
    expect(footer.props.style.height).toBe(30);
    expect(footer.props.style.paddingRight).toBe(10);

  });

  it('verifies the styles of the footer button text', async () => {
    const { getByTestId } = render(<RepoItem itemData={itemDataMock} footerButtonPressed={footerButtonPressedMock} />);

    const footerButtonText = getByTestId('footer-button-text');

    expect(footerButtonText.props.style[0].fontWeight).toBe('800');
    expect(footerButtonText.props.style[1].color).toBe('#0300A8');

  });
});
