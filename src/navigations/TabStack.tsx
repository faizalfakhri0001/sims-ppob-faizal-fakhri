import React from 'react'
import { Color } from 'config';
import { TabParamList } from 'types/navigations';
import { BackButton, HomeHeader } from 'components';
import { Akun, Home, TopUp, Transaction } from 'pages';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<TabParamList>();

const TabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="history"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={() => {
          return {
            header: ({navigation}) => <HomeHeader />,
            ...getCommonTabOption('home')
          }
        }}
      />

      <Tab.Screen
        name="TopUp"
        component={TopUp}
        options={({navigation}) => {
          return {
            title: "Top Up",
            headerLeft: (props) => <BackButton {...props} navigation={navigation}/>,
            ...getCommonTabOption('cash-100')
          }
        }}
      />

      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={({navigation}) => {
          return {
            title: "Transaksi",
            headerLeft: (props) => <BackButton {...props} navigation={navigation}/>,
            ...getCommonTabOption('credit-card-outline')
          }
        }}
      />

      <Tab.Screen
        name="Akun"
        component={Akun}
        options={({navigation}) => {
          return {
            headerLeft: (props) => <BackButton {...props} navigation={navigation}/>,
            ...getCommonTabOption('account')
          }
        }}
      />
    </Tab.Navigator>
  )
}

function getCommonTabOption(iconName: string): BottomTabNavigationOptions {
  return {
    tabBarIcon: ({focused}) => {
      return <Icon name={iconName} size={28} color={focused ? Color.black : Color.grey}/>
    },
    headerStyle:{
      height: 72,
    },
    tabBarActiveTintColor: Color.black,
    tabBarInactiveTintColor: Color.grey,
    headerShadowVisible: false,
    headerTitleStyle: {fontSize: 16},
    headerTitleAlign: 'center',
    headerLeftLabelVisible:true,
  }
}

export default TabStack