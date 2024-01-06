import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { AuthHeader, Input, Button } from 'components'
import { Ref as InputRefType } from 'src/components/Input'
import { Color } from 'config'
import { AuthScreenProps } from 'types/navigations'

interface Props extends AuthScreenProps<'Login'> {}

const Login:React.FC<Props> = (props) => {
  const {navigation} = props;
  const inputRef2 = useRef<InputRefType>(null)
  return (
    <SafeAreaView style={styles.container}>
      <AuthHeader />
      <Text style={styles.title} allowFontScaling={false}>
        Masuk atau buat akun untuk memulai
      </Text>
      <View style={styles.inputContainer}>
        <Input 
          leftIcon='at'
          returnKeyType='next'
          onSubmitEditing={() => {
            inputRef2.current?.focus()
          }}
          placeholder='Massukkan email anda'/>
        <Input 
          ref={inputRef2}
          leftIcon='lock-outline'
          rightIcon='eye-outline'
          secureTextEntry
          textContentType='password'
          onSubmitEditing={() => {
            console.log('submit')
          }}
          placeholder='Masukkan password anda'/>
      </View>
      <View>
        <Button label='Masuk' />
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