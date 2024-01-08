import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationProp } from '@react-navigation/native';
import { Color } from 'config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type BackButtonProps = {
  navigation: NavigationProp<any>;
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
  marginLeft?: number | undefined;
}
const BackButton: React.FC<BackButtonProps> = (props) => {
  return (
    <Pressable
      onPress={() => props.navigation.goBack()}
      style={{flexDirection:'row', columnGap: 4, marginLeft: props.marginLeft ?? 14, alignItems:'center'}}>
      <Icon color={Color.black} name='arrow-left' size={20} />
      {props.labelVisible ? <Text allowFontScaling={false} style={{ fontSize: 16, color: Color.black}}>kembali</Text> : null}
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})