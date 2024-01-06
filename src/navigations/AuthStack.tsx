import React from 'react'
import { AuthParamList } from 'types/navigations';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from 'src/pages/Login';
import { Register } from 'pages';

const AuthNavigation = createNativeStackNavigator<AuthParamList>();

const AuthStack = () => {
  return (
    <AuthNavigation.Navigator
      initialRouteName={'Login'}
    >
      <AuthNavigation.Screen
        name='Login'
        component={Login}
        options={{headerShown: false}}
      />
      <AuthNavigation.Screen
        name='Register'
        component={Register}
        options={{headerShown: false}}
      />
    </AuthNavigation.Navigator>
  )
}

export default AuthStack