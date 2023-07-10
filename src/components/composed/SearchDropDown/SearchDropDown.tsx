///////////////////////
// Modules
///////////////////////

import React, { FC, useState, useImperativeHandle, forwardRef, Ref } from 'react';
import { 
  View,
  Text, 
  FlatList, 
  NativeSyntheticEvent, 
  TextInput,
  TextInputChangeEventData
} from 'react-native';

///////////////////////
// Types
///////////////////////

import { ISearchDropDown, ISearchDropDownRef } from './types'

///////////////////////
// Styles
///////////////////////

import styles from './styles';
import commonStyles from '../../../styles/common';

///////////////////////
// Constants
///////////////////////

const SHOWS_VERTICAL_SCROLL_INDICATOR = false;
const TEXT_INPUT_PLACE_HOLDER_TEXT = 'Search Github Repos';
const NO_RESULTS_FOUND = 'No Results Found';

///////////////////////
// Component
///////////////////////

const SearchDropDown: FC<ISearchDropDown> = forwardRef((props: ISearchDropDown , ref: Ref<ISearchDropDownRef>) => {
  
  const {
    renderItem,
    data,
    onChange,
  } = props;

  const [ inputText , setInputText ] = useState<string>("");
  const [ showDropDown, setShowDropDown] = useState<boolean>(false);

  const onSearchInputTextChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const text = e.nativeEvent.text;

    if(onChange){
      onChange(text)
    }
    setInputText(text)

    if(text.length > 0){
      setShowDropDown(true);
    }else{
      setShowDropDown(false);
    }
  }

  const NoResultsFound = () => {
    return(
      <View style={styles.noResultsFound} testID="no-results-found">
        <Text>{NO_RESULTS_FOUND}</Text>
      </View>
    )
  }

  // Exposes a close function to parent components
  useImperativeHandle(ref, () => ({
    close() {
      setShowDropDown(false);
    }
  }));

  return (
    <View style={styles.container} testID="container">
      <TextInput 
        placeholder={TEXT_INPUT_PLACE_HOLDER_TEXT}
        style={[styles.searchInput, commonStyles.SHADOW]} 
        onChange={e => onSearchInputTextChange(e)}
        value={inputText}
        testID="search-input"
      />
      {showDropDown &&
        <FlatList
          ListEmptyComponent={NoResultsFound}
          showsVerticalScrollIndicator={SHOWS_VERTICAL_SCROLL_INDICATOR} 
          renderItem={renderItem} 
          data={data}  
          style={styles.list}
          testID="dropdown-list"
        />
      }
    </View> 
  )
});

export default SearchDropDown;
