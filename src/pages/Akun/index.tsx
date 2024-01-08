import { SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Color } from 'config'
import { AvatarAccount, Button, Input } from 'components'
import { useMMKV } from 'react-native-mmkv'
import { logout } from 'store/feature/account/slice'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { Ref as RefInput} from 'src/components/Input'
import { updateAvatar, updateProfile } from 'store/feature/account/actions'
import {launchImageLibrary} from 'react-native-image-picker';

type Props = {}

const Akun: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch()
  const storage = useMMKV();
  const inputRefs = useRef<RefInput[]>([])
  const [edit, setEdit] = useState<boolean>(false);
  const {user_profile} = useAppSelector(state => state.account);
  const [photoEditBuffer, setPhotoEditBuffer] = useState<any>(null);

  const handleLogout = useCallback(() => {
    storage.delete('token');
    dispatch(logout())
  }, []);

  const getInput = useCallback(() => {
    const emailInput = inputRefs.current[0]
    const firstNameInput = inputRefs.current[1]
    const lastNameInput = inputRefs.current[2] 
    
    return {emailInput, firstNameInput, lastNameInput}
  }, [])

  useEffect(() => {
    if (user_profile) {
      const {emailInput, firstNameInput, lastNameInput} = getInput()

      emailInput.setValue(user_profile.email)
      firstNameInput.setValue(user_profile.first_name)
      lastNameInput.setValue(user_profile.last_name)
    }
  }, [user_profile]);

  const handleSave = useCallback(() => {
    const {emailInput, firstNameInput, lastNameInput} = getInput();

    dispatch(updateProfile({
      first_name: firstNameInput.getValue(),
      last_name: lastNameInput.getValue()
    })).then((res: any) => {
      setEdit(false)
      setPhotoEditBuffer(null)

      if (res.meta.requestStatus === 'rejected' && user_profile) {
        emailInput.setValue(user_profile?.email)
        firstNameInput.setValue(user_profile?.first_name)
        lastNameInput.setValue(user_profile?.last_name)
        ToastAndroid.show(res.payload.message, 1000)
      }
    })
  }, [user_profile])

  const handleAvatarChange = useCallback(async () => {
    if (!edit) {
      return;
    }
    await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.4,
      maxWidth: 50,
      maxHeight: 50,
    }, res => {
      if (res.didCancel) {
        setPhotoEditBuffer(null)
        return
      }
      if (res.assets && res.assets.length > 0) {
        const photo = res.assets[0];

        dispatch(updateAvatar(photo)).then(res => {
          setEdit(false)
          setPhotoEditBuffer(null)

          if (res.meta.requestStatus === 'rejected') {
            ToastAndroid.show(res.payload.message, 1000)
          }
        })
        setPhotoEditBuffer(photo)
      }
    })
  }, [edit])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <AvatarAccount
            onEdit={handleAvatarChange}
            photo_uri={edit && photoEditBuffer ? photoEditBuffer.uri : user_profile?.profile_image} name={`${user_profile?.first_name} ${user_profile?.last_name}`} />
          <View style={styles.inputContainer}>
            <Text allowFontScaling={false} style={styles.inputLabel}>Email</Text>
            <Input style={{color: Color.black}} editable={edit} leftIcon='at' placeholder='email' ref={el => {if (el) {inputRefs.current.push(el)}}} />
          </View>

          <View style={styles.inputContainer}>
            <Text allowFontScaling={false} style={styles.inputLabel}>Nama Depan</Text>
            <Input style={{color: Color.black}} editable={edit} leftIcon='account-outline' placeholder='nama depan' ref={el => {if (el) {inputRefs.current.push(el)}}}/>
          </View>

          <View style={styles.inputContainer}>
            <Text allowFontScaling={false} style={styles.inputLabel}>Nama Belakang</Text>
            <Input style={{color: Color.black}} editable={edit} leftIcon='account-outline' placeholder='nama belakang' ref={el => {if (el) {inputRefs.current.push(el)}}}/>
          </View>

          {!edit ?
            <React.Fragment>
              <Button label='Edit Profile' type={'outline'} onPress={() => setEdit(true)}/>
              <Button label='Logout' onPress={handleLogout}/>
            </React.Fragment> :
            <React.Fragment>
              <Button label='Simpan' onPress={handleSave} />
              <Button label='Batalkan' type={'outline'} onPress={() => {
                setEdit(false);
                setPhotoEditBuffer(null);
                }} />
            </React.Fragment>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Akun

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  innerContainer: {
    flex: 1,
    rowGap: 24,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
  },
  inputContainer: {
    rowGap: 12,
  },
  inputLabel: {
    fontSize: 16,
    color: Color.black,
  }
})