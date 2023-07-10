import React, { FC } from 'react';
import { TouchableOpacity, Text} from 'react-native';

import { IButton } from './types';

import styles from './styles';

const Button: FC<IButton> = ({ title, onPress, testID }) => {

  return (
    <TouchableOpacity style={styles.button} onPress={onPress} testID={testID}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );

}

export default Button;