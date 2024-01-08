import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Images } from 'assets'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from 'config';

type Props = {
  name: string
  photo_uri?: string;
  onEdit?: () => void
}

const AvatarAccount = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image
          source={props.photo_uri && !props.photo_uri.includes('null') ? {uri: props.photo_uri} : Images.profile_photo}
          style={styles.avatar}
          borderRadius={112/2}
        />
        <Pressable onPress={props.onEdit} style={styles.edit}>
          <Icon name='pencil' />
        </Pressable>
      </View>
      <Text allowFontScaling={false} style={styles.name}>{props.name}</Text>
    </View>
  )
}

export default AvatarAccount

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  innerContainer: {},
  avatar: {
    width: 112,
    height: 112,
  },
  edit: {
    bottom: 0,
    right: 0,
    position:'absolute',
    width: 28,
    height: 28,
    borderRadius: 99,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Color.grey,
    backgroundColor: Color.white,
  },
  name: {
    fontSize: 24,
    marginTop: 12,
    fontWeight: '600',
    color: Color.black,
  },
})