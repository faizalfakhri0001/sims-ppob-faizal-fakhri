import { Pressable, PressableProps, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native'
import React from 'react'
import { Color } from 'config'

type Props = {
  label: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
} & PressableProps

const Button: React.FC<Props> = (props) => {
  return (
    <Pressable {...props} style={[styles.container, props.style]}>
      <Text style={[styles.title, props.textStyle]}>{props.label}</Text>
    </Pressable>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.red,
    borderRadius: 4,
  },
  title: {
    color: 'white',
  },
})