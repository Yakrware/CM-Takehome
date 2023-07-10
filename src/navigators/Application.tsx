///////////////////////
// Modules
///////////////////////

import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

///////////////////////
// Navigation
///////////////////////

import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

///////////////////////
// Types
///////////////////////

import { ApplicationStackParamList } from '../../@types/navigation';

///////////////////////
// Screens
///////////////////////

import Home from '../screens/Home';

///////////////////////
// Styles
///////////////////////

import commonStyles from '../styles/common';

///////////////////////
// Constants
///////////////////////

const STACK = createStackNavigator<ApplicationStackParamList>();
const HEADER_SHOWN = false;

///////////////////////
// Navigator
///////////////////////

const ApplicationNavigator = () => {

  const navigationRef = useNavigationContainerRef();

  return (
    <SafeAreaView style={commonStyles.FILL}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar />
        <STACK.Navigator screenOptions={{ headerShown: HEADER_SHOWN }}>
          <STACK.Screen name="Home" component={Home} />
        </STACK.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
