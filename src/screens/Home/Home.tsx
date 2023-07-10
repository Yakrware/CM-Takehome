///////////////////////
// Modules
///////////////////////

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Alert
} from 'react-native';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'

///////////////////////
// Components
///////////////////////

import SearchDropDown from 'GithubApp/src/components/composed/SearchDropDown';
import RepoItem from 'GithubApp/src/components/base/RepoItem';
import Favorites from 'GithubApp/src/components/composed/Favorites';

///////////////////////
// Hooks
///////////////////////

import { useLazyRepoSearchQuery } from '../../services/modules/github';

///////////////////////
// Thunks
///////////////////////

import { 
  addRepo, 
  getRepos, 
  deleteRepo,
  sortReposAscending,
  sortReposDescending,
} from 'GithubApp/src/store/Repos';

///////////////////////
// Styles
///////////////////////

import styles from './styles';
import commonStyles from '../../styles/common';

///////////////////////
// Types
///////////////////////

import { ISearchDropDownRef } from '../../components/composed/SearchDropDown/types';
import { IRepository } from 'GithubApp/src/store/Repos/types';
import { AppDispatch } from 'GithubApp/src/store';
import { GlobalState } from 'GithubApp/src/store/types';

///////////////////////
// Constants
///////////////////////

const DEBOUNCE_WAIT = 100;
const REMOVE_FROM_LIST = '- Remove From List';
const SAVED_REPOS_LIMIT = 10;
const REPO_LIMIT_ALERT = 'You\'ve hit the limit of 10 repositories. Please delete some to add new ones.';

///////////////////////
// Screen
///////////////////////

const Home = () => {

  const dispatch: AppDispatch = useDispatch();
  const [repoSearch, { data }] = useLazyRepoSearchQuery();
  const debounceRepoSearch = _.debounce(query => repoSearch(query), DEBOUNCE_WAIT);
  const searchDropDownRef = useRef<ISearchDropDownRef>();
  const repoData = useSelector((state: GlobalState) => state.repos.get.data );
  const loading = useSelector((state: GlobalState) => state.repos.get.loading);
  const [ sorted, setSorted ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getRepos())
  }, [])

  const onSearchInputTextChange = (text: string) => {
    debounceRepoSearch(text);
  }

  const addToFavoritesPress = (data: IRepository) => {
    searchDropDownRef?.current?.close();
    if(repoData.length < SAVED_REPOS_LIMIT){
      dispatch(addRepo(data));
    }else{
      Alert.alert(REPO_LIMIT_ALERT);
    }
  }

  const removeFromListPress = (data: IRepository) => {
    dispatch(deleteRepo(data.id));
  }

  const RenderDropDownRepoItem = ({ item }: { item: IRepository }) => {
    return (
      <RepoItem 
        itemData={item} 
        footerButtonPressed={addToFavoritesPress} 
      />
    );
  }

  const RenderFavoritesRepoItem = ({ item }: { item: IRepository }) => {
    return (
      <RepoItem 
        itemData={item} 
        footerButtonTitle={REMOVE_FROM_LIST}
        footerButtonPressed={removeFromListPress} 
      />
    );
  }

  const onSortButtonPress = () => {
    sorted ? dispatch(sortReposAscending()) : dispatch(sortReposDescending());
    setSorted(!sorted);
  }

  return (
    <View style={[commonStyles.FILL, styles.container]}>
      <SearchDropDown
        ref={searchDropDownRef}
        renderItem={RenderDropDownRepoItem}
        data={data}
        onChange={onSearchInputTextChange}
      />
      <Favorites 
        renderItem={RenderFavoritesRepoItem}
        data={repoData}
        onSortButtonPress={onSortButtonPress}
        isLoading={loading}
      />
    </View>
  );
};


export default Home;
