///////////////////////
// Modules
///////////////////////

import React, { FC } from 'react';
import { View, Text } from 'react-native';

///////////////////////
// Types
///////////////////////

import { ICard } from './types';

///////////////////////
// Styles
///////////////////////

import styles from './styles';
import commonStyles from '../../../styles/common';

///////////////////////
// Components
///////////////////////

const Card: FC<ICard> = ({ children, hero, title }) => {

  return (
    <View style={[styles.card, commonStyles.SHADOW]} testID={'card'}>
      <View style={styles.cardHeader} testID={'card-header'}>
        <Text style={styles.cardHeaderLabel} testID={'card-header-label'}>{title}</Text>
      </View>
      {hero &&
        <View style={styles.hero} testID={'card-hero'}>
          {hero()}
        </View>
      }
      <View style={styles.cardBody} testID={'card-body'}>
        {children}
      </View>
    </View>
  )

}

///////////////////////
// Default Props
///////////////////////

Card.defaultProps = {
  title: 'Hello World',
}

export default Card;