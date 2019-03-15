import React from 'react';
import { StatusBar } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import List from './screens/List';
import Detail from './screens/Detail';

StatusBar.setBarStyle('light-content');

const RootNavigator = createStackNavigator({
  List: List,
  Detail: Detail
});

export default createAppContainer(RootNavigator);

