import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from 'assets'

type Props = {}

const AuthHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={Images.logo}
        style={styles.logo}
      />
      <Text style={styles.text} allowFontScaling={false}>
        SIMS PPOB
      </Text>
    </View>
  )
}

export default AuthHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 8,
  },
  logo: {
    width: 30,
    height: 30,
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: '700',
  }
})