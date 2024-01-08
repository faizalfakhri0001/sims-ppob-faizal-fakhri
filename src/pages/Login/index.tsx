import React, { useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AuthHeader, Input, Button } from 'components'
import { Ref as InputRefType } from 'src/components/Input'
import { Color } from 'config'
import { AuthScreenProps } from 'types/navigations'
import { useAppDispatch } from 'src/hooks/redux'
import { login } from 'store/feature/account/actions'

interface Props extends AuthScreenProps<'Login'> {}

const Login:React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const inputRef = useRef<InputRefType[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }

  function handleLogin() {
    const email = inputRef.current[0].getValue();
    const password = inputRef.current[1].getValue();
    dispatch(login({email, password}));
  }

  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <Text style={styles.title} allowFontScaling={false}>
        Masuk atau buat akun untuk memulai
      </Text>
      <View style={styles.inputContainer}>
        <Input
          ref={el => {if (el) {inputRef.current.push(el)}}}
          leftIcon='at'
          returnKeyType='next'
          onSubmitEditing={() => {
            inputRef.current[1].focus()
          }}
          placeholder='massukkan email anda'/>
        <Input 
          ref={el => {if (el) {inputRef.current.push(el)}}}
          leftIcon='lock-outline'
          rightIcon='eye-outline'
          secureTextEntry={!showPassword}
          textContentType='password'
          onSubmitEditing={handleLogin}
          onPressRightIcon={toggleShowPassword}
          placeholder='masukkan password anda'/>
      </View>
      <View>
        <Button label='Masuk' onPress={handleLogin}/>
        <Text style={styles.registerText}>belum punya akun? registrasi
        <Text style={styles.here} onPress={() => {
          navigation.navigate('Register')
        }}> disini</Text></Text>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    rowGap: 56,
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
  },
  inputContainer: {
    rowGap: 24,
  },
  registerText: {
    marginTop: 28,
    fontSize: 13,
    textAlign: 'center',
  },
  here: {
    fontWeight: '700',
    color: Color.red,
  }
})