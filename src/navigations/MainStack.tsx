import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootParamList } from 'types/navigations';
import TabStack from './TabStack';
import Pembayaran from 'src/pages/Pembayaran';
import { BackButton } from 'components';

const RootNavigation = createNativeStackNavigator<RootParamList>();

const RootStack = () => {
  return (
    <RootNavigation.Navigator
      initialRouteName={'Tab'}
    >
      <RootNavigation.Screen
        name='Tab'
        component={TabStack}
        options={{headerShown: false}}
      />

      <RootNavigation.Screen
        name='Pembayaran'
        component={Pembayaran}
        options={({navigation}) => { return {
          animation: 'slide_from_bottom',
          animationDuration: 100,
          title:"PemBayaran",
          headerLeft: (props) => <BackButton {...props} marginLeft={0} labelVisible navigation={navigation}/>,
          headerTitleStyle: {fontSize: 16},
          headerShadowVisible: false,
          headerTitleAlign: 'center',
        }}}
      />
    </RootNavigation.Navigator>
  )
}

export default RootStack