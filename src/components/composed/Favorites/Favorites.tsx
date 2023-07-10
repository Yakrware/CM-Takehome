///////////////////////
// Modules
///////////////////////

import React, { FC } from 'react';
import { FlatList, View, Text, ActivityIndicator } from 'react-native';

///////////////////////
// Components
///////////////////////

import Card from 'GithubApp/src/components/base/Card';
import Button from 'GithubApp/src/components/base/Button';

///////////////////////
// Types
///////////////////////

import { IFavorites } from './types';

///////////////////////
// Styles
///////////////////////

import styles from './styles';

///////////////////////
// Constants
///////////////////////

const FAVORITES = 'Favorites';
const NO_FAVORITES = 'No Favorites, search to add some repositories!';
const SORT = 'Sort';
const SHOWS_VERTICAL_SCROLL_INDICATOR = false;

///////////////////////
// Component
///////////////////////

const Favorites: FC<IFavorites> = ({ renderItem, data, onSortButtonPress, isLoading }) => {
  
  const ListIsEmpty = () => {
    if (isLoading) {
      return (
        <View style={styles.listEmpty} testID="favorites-loading">
          <ActivityIndicator />
        </View>
      );
    } else {
      return (
        <View style={styles.listEmpty} testID="favorites-empty">
          <Text testID="favorites-empty-text">{NO_FAVORITES}</Text>
        </View>
      );
    }
  };

  const CardHero = () => {
    return (
      <View>
        <Button title={SORT} onPress={onSortButtonPress} testID="sort-button" />
      </View>
    );
  };

  return (
    <Card title={FAVORITES} hero={CardHero}>
      <FlatList
        showsVerticalScrollIndicator={SHOWS_VERTICAL_SCROLL_INDICATOR}
        renderItem={renderItem}
        data={data}
        ListEmptyComponent={ListIsEmpty}
        testID="favorites-list"
      />
    </Card>
  );
};

export default Favorites;
