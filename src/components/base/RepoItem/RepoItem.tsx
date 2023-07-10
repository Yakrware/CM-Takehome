///////////////////////
// Modules
///////////////////////

import React, { FC } from 'react';
import { View, Text } from 'react-native';


///////////////////////
// Types
///////////////////////

import { IRepoItem } from './types';

///////////////////////
// Styles
///////////////////////

import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

///////////////////////
// Constants
///////////////////////

const NUMBER_OF_LINES = 2;
const NAME_LABEL = 'Name: ';
const DESCRIPTION_LABEL = 'Description: ';
const LANGUAGE_LABEL = 'Language: ';
const STARS_LABEL = 'Stars: ';
const ADD_TO_FAVORITES = '+ Add To Favorites'

///////////////////////
// Component
///////////////////////

const RepoItem: FC<IRepoItem> = ({ itemData, footerButtonPressed, footerButtonTitle }) => {

  return (
    <View style={styles.listItem} testID={'list-item'}>
      <View style={styles.itemContainer} testID={'item-container'}>
        <Text><Text style={styles.boldLabel}>{NAME_LABEL}</Text>{itemData?.fullName}</Text>
        { itemData?.description &&
          <Text numberOfLines={NUMBER_OF_LINES}><Text style={styles.boldLabel} testID={'description-label'}>{DESCRIPTION_LABEL}</Text> {itemData?.description}</Text>
        }
        <Text><Text style={styles.boldLabel}>{LANGUAGE_LABEL}</Text> {itemData?.language}</Text>
        <Text><Text style={styles.boldLabel}>{STARS_LABEL}</Text>{itemData?.stargazersCount}</Text>
      </View>
      <View style={styles.footer} testID={'footer'}>
        <TouchableOpacity onPress={() => footerButtonPressed(itemData)}>
          <Text style={[styles.boldLabel, styles.footerButton]} testID={'footer-button-text'}>{footerButtonTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

}

///////////////////////
// Default Props
///////////////////////

RepoItem.defaultProps = {
  footerButtonTitle: ADD_TO_FAVORITES,
}

export default RepoItem;