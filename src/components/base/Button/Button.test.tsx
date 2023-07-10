import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '../Button'; // Change this to the path of your component

describe('Button', () => {
  const titleMock = 'Test Button';
  const onPressMock = jest.fn();
  const testIDMock = 'button';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with all props', () => {
    const { getByText, getByTestId } = render(<Button title={titleMock} onPress={onPressMock} testID={testIDMock} />);
    
    expect(getByText(titleMock)).toBeTruthy();
    expect(getByTestId(testIDMock)).toBeTruthy();
  });

  it('should call onPress when pressed', () => {
    const { getByText } = render(<Button title={titleMock} onPress={onPressMock} testID={testIDMock} />);
    
    fireEvent.press(getByText(titleMock));
    
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('verifies the styles of the button', async () => {
    const { getByTestId } = render(<Button title={titleMock} onPress={onPressMock} testID={testIDMock} />);

    const button = getByTestId('button');

    expect(button.props.style.width).toBe(100);
    expect(button.props.style.height).toBe(30);
    expect(button.props.style.borderWidth).toBe(1);
    expect(button.props.style.borderTopColor).toBe('#FFFFFF');
    expect(button.props.style.borderLeftColor).toBe('#FFFFFF');
    expect(button.props.style.backgroundColor).toBe('#C0C7C8');
    expect(button.props.style.alignItems).toBe('center');
    expect(button.props.style.justifyContent).toBe('center');

  });



});
