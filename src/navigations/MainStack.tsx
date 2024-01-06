import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from 'types/navigations';
import { Home } from 'pages';

const RootNavigation = createNativeStackNavigator<RootParamList>();

const RootStack = () => {
  return (
    <RootNavigation.Navigator
      initialRouteName={'Home'}
    >
      <RootNavigation.Screen
        name='Home'
        component={Home}
      />
    </RootNavigation.Navigator>
  )
}

export default RootStack