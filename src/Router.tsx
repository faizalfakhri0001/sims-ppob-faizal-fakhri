import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { MainStack, AuthStack } from './navigations'
import { useAppDispatch, useAppSelector } from './hooks/redux'
import { useMMKV } from 'react-native-mmkv'
import { setToken } from 'store/feature/account/slice'

const Router = () => {
  const dispatch = useAppDispatch();
  const {isLogin} = useAppSelector(state => state.account);
  const storage = useMMKV();
  const token = storage.getString('token'); 

  useEffect(() => {
    if (!isLogin && token?.length && token?.length > 0) {
      dispatch(setToken(token))
    }
  }, [token])

  return (
    <NavigationContainer>
      {isLogin || token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default Router