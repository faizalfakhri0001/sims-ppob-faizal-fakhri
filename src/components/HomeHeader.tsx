import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color } from 'config'
import { Images } from 'assets'
import { useAppSelector } from 'src/hooks/redux'


const HeaderLeft = () => {
  return (
    <View style={styles.leftContainer}>
      <Image
        source={Images.logo}
        style={styles.logo}
      />
      <Text style={styles.logoText}>SSIM PPOD</Text>
    </View>
  )
}

type HeaderRightProps = {
  photo_uri?: string;
}
const HeaderRight = (props: HeaderRightProps) => {
  return (
    <View>
      <Image
        source={props.photo_uri ? {uri: props.photo_uri} : Images.profile_photo_1}
        style={styles.avatar}
      />
    </View>
  )
}

type Props = {}
const HomeHeader = (props: Props) => {
  const {user_profile} =  useAppSelector(state => state.account);
  return (
    <View style={styles.headerContainer}>
      <HeaderLeft />
      <HeaderRight photo_uri={user_profile?.profile_image} />
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: Color.white,
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  logo: {
    width: 25,
    height: 25,
  },
  logoText: {
    width: 100,
    fontSize: 12,
    color: Color.black,
    fontWeight: '500',
  },
  avatar: {
    width: 40,
    height: 40,
  },
})