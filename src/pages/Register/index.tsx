import { SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import { Color } from 'config'
import { AuthHeader, Button, Input } from 'components'
import { Ref as InputRefType } from 'src/components/Input'
import { AuthScreenProps } from 'types/navigations'
import { useAppDispatch } from 'src/hooks/redux'
import { registration } from 'store/feature/account/actions'

interface Props extends AuthScreenProps<'Register'> {}

const Register:React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const inputRef = useRef<InputRefType[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  function toggleShowPassword() {
    setShowPassword(prev => !prev);
  }

  const onChangePassword = useCallback((text: string) => {
    const passwordRef = inputRef.current[3];
    const passwordConfirmationRef = inputRef.current[4];
    const passwordConfirmationText = passwordConfirmationRef.getValue();

    if (passwordConfirmationText.length > 0 && text != passwordConfirmationText) {
      passwordRef.showDanger(true)
      passwordConfirmationRef.showDanger(true)
    } else {
      passwordRef.showDanger(false)
      passwordConfirmationRef.showDanger(false)
    }
  }, [])

  const onChangeConfirmation = useCallback((text: string) => {
    const passwordRef = inputRef.current[3];
    const passwordText = passwordRef.getValue();
    const passwordConfirmationRef = inputRef.current[4];

    if (passwordText.length > 0 && text != passwordText) {
      passwordRef.showDanger(true)
      passwordConfirmationRef.showDanger(true)
    } else {
      passwordRef.showDanger(false)
      passwordConfirmationRef.showDanger(false)
    }
  }, [])

  const handleRegis = useCallback(() => {
    const email = inputRef.current[0].getValue();
    const firstName = inputRef.current[1].getValue();
    const lastName = inputRef.current[2].getValue();
    const password = inputRef.current[3].getValue();
    const passwordConfirmation = inputRef.current[4].getValue();

    if (password !== passwordConfirmation) {
      ToastAndroid.show("password not match", 1000);
      return;
    }

    dispatch(registration({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    })).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
        ToastAndroid.show(res.payload.message, 1000);
        navigation.goBack();
      } else if (res.meta.requestStatus === 'rejected') {
        ToastAndroid.show(res.payload.message, 1000);
      }
    }) 
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <View style={styles.innerContainer}>
          <AuthHeader />
          <Text style={styles.title} allowFontScaling={false}>
            Lengkapi data untuk membuat
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
              leftIcon='account-outline'
              returnKeyType='next'
              onSubmitEditing={() => {
                inputRef.current[2].focus()
              }}
              placeholder='nama depan'/>
            <Input
              ref={el => {if (el) {inputRef.current.push(el)}}}
              leftIcon='account-outline'
              returnKeyType='next'
              onSubmitEditing={() => {
                inputRef.current[3].focus()
              }}
              placeholder='nama belakang'/>
            <Input 
              ref={el => {if (el) {inputRef.current.push(el)}}}
              leftIcon='lock-outline'
              rightIcon='eye-outline'
              returnKeyType='next'
              secureTextEntry={!showPassword}
              textContentType='password'
              onSubmitEditing={() => {
                inputRef.current[4].focus()
              }}
              onPressRightIcon={toggleShowPassword}
              onChangeText={onChangePassword}
              placeholder='buat password'/>
            <Input 
              ref={el => {if (el) {inputRef.current.push(el)}}}
              leftIcon='lock-outline'
              rightIcon='eye-outline'
              secureTextEntry={!showPassword}
              textContentType='password'
              onSubmitEditing={handleRegis}
              onChangeText={onChangeConfirmation}
              onPressRightIcon={toggleShowPassword}
              placeholder='konfirmasi password'/>
          </View>
          <View>
            <Button label='Registrasi' onPress={handleRegis}/>
            <Text style={styles.registerText}>sudah punya akun? login
            <Text style={styles.here} onPress={() => {
              navigation.navigate('Login')
            }}> disini</Text></Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    rowGap: 56,
    paddingVertical: 56,
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
    color: Color.black,
  },
  here: {
    fontWeight: '700',
    color: Color.red,
  }
})