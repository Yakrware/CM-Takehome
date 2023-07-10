import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import Card from '../Card'; // Change this to the path of your component

describe('Card', () => {
  const ChildMock = () => <Text>Child component</Text>;
  const HeroMock = () => <Text>Hero component</Text>;
  const titleMock = 'Test Title';

  it('should render correctly with all props', () => {
    const { getByText } = render(<Card hero={HeroMock} title={titleMock}><ChildMock /></Card>);
    
    expect(getByText(titleMock)).toBeTruthy();
    expect(getByText('Child component')).toBeTruthy();
    expect(getByText('Hero component')).toBeTruthy();
  });

  it('should render correctly without hero prop', () => {
    const { getByText, queryByText } = render(<Card title={titleMock}><ChildMock /></Card>);
    
    expect(getByText(titleMock)).toBeTruthy();
    expect(getByText('Child component')).toBeTruthy();
    expect(queryByText('Hero component')).toBeNull();
  });

  it('should render correctly without children', () => {
    const { getByText, queryByText } = render(<Card hero={HeroMock} title={titleMock} />);
    
    expect(getByText(titleMock)).toBeTruthy();
    expect(getByText('Hero component')).toBeTruthy();
    expect(queryByText('Child component')).toBeNull();
  });

  it('should render correctly without title', () => {
    const { getByText, queryByText } = render(<Card hero={HeroMock}><ChildMock /></Card>);
    
    expect(getByText('Child component')).toBeTruthy();
    expect(getByText('Hero component')).toBeTruthy();
    expect(queryByText(titleMock)).toBeNull();
  });

  it('should render with default title when no title prop is provided', () => {
    const { getByText } = render(<Card hero={HeroMock}><ChildMock /></Card>);
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('verifies the styles of the card', async () => {
    const { getByTestId } = render(<Card hero={HeroMock}><ChildMock /></Card>);

    const card = getByTestId('card');

    expect(card.props.style[0].height).toBe('85%');
    expect(card.props.style[0].marginHorizontal).toBe(20);
    expect(card.props.style[0].backgroundColor).toBe('#C0C7C8');
    expect(card.props.style[0].borderWidth).toBe(1);

  });

  it('verifies the styles of the card header', async () => {
    const { getByTestId } = render(<Card hero={HeroMock}><ChildMock /></Card>);

    const cardHeader = getByTestId('card-header');

    expect(cardHeader.props.style.backgroundColor).toBe('#0300A8');
    expect(cardHeader.props.style.margin).toBe(2);
    expect(cardHeader.props.style.marginBottom).toBe(10);
    expect(cardHeader.props.style.padding).toBe(4);

  });

  it('verifies the styles of the card header label', async () => {
    const { getByTestId } = render(<Card hero={HeroMock}><ChildMock /></Card>);

    const cardHeaderLabel = getByTestId('card-header-label');

    expect(cardHeaderLabel.props.style.color).toBe('#FFFFFF');

  });

  it('verifies the styles of the card hero', async () => {
    const { getByTestId } = render(<Card hero={HeroMock}><ChildMock /></Card>);

    const cardHero = getByTestId('card-hero');

    expect(cardHero.props.style.alignItems).toBe('flex-end');
    expect(cardHero.props.style.marginHorizontal).toBe(10);

  });

  it('verifies the styles of the card body', async () => {
    const { getByTestId } = render(<Card hero={HeroMock}><ChildMock /></Card>);

    const cardBody = getByTestId('card-body');

    expect(cardBody.props.style.flex).toBe(1);
    expect(cardBody.props.style.backgroundColor).toBe('#FFFFFF');
    expect(cardBody.props.style.margin).toBe(10);
    expect(cardBody.props.style.borderWidth).toBe(1);

  });



});
