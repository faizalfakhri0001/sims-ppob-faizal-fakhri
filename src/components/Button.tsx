import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'
import React from 'react'
import { Color } from 'config'

type Props = {
  type?: 'solid' | 'outline' | 'text'
  label: string
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
} & TouchableOpacityProps

const Button: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.7} 
      style={[
        props.type === 'text' ? styles.containerText : props.type === 'outline' ? styles.containerOutline : styles.container,
        props.disabled ? styles.disabled : null,
        props.style,
        ]}>
      <Text
        allowFontScaling={false}
        style={[
          {
            color: props.type === 'outline' || props.type === 'text' ? Color.red : Color.white,
            fontWeight: props.type === 'text' ? '700' : '400' 
          }, props.textStyle]}>
          {props.label}
      </Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.red,
    borderRadius: 4,
  },
  containerOutline: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Color.red,
  },
  containerText: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.white,
    borderRadius: 4,
  },
  disabled: {
    backgroundColor: Color.disable
  }
})