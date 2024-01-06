import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  leftIcon?: string,
  rightIcon?: string,
} & TextInputProps

export type Ref = {
  focus: () => void
  showDanger: () => void
}

const Input = React.forwardRef<Ref, Props>((props, ref) => {
  const inputRef = useRef<TextInput>(null)
  const [value, setValue] = useState<string>('');
  const [borderColor, setBorderColor] = useState<string>('lightgrey');
  const [leftIconColor, setLeftIconColor] = useState<string>('lightgrey');
  const [rightIconColor, setRightIconColor] = useState<string>('lightgrey');

  const onChangeText = useCallback((text: string) => {
    if (props.onChangeText) {
      props.onChangeText(text)
    }

    setValue(text);
    if (text.length > 0) {
      setLeftIconColor('black')
      setBorderColor('lightgrey')
    } else if (text.length === 0) {
      setLeftIconColor('lightgrey')
      setBorderColor('lightgrey')
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus()
      },
      showDanger: () => {
        setBorderColor('orange')
        setLeftIconColor('orange')
      }
    }
  }, [])
  return (
    <View style={[styles.container, {borderColor: borderColor}]}>
      {typeof props.leftIcon === 'string' ?
        <Icon name={props.leftIcon} size={20} color={leftIconColor} /> : null
      }
      <TextInput
        {...props}
        ref={inputRef}
        value={value}
        onChangeText={onChangeText}
        style={[props.style, styles.input]}
      />
      {typeof props.rightIcon === 'string' ?
        <Icon name={props.rightIcon} size={20} color={rightIconColor} /> : null
      }
    </View>
  )
})

export default Input

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  input: {
    flex: 1,
    marginHorizontal: 4,
  }
})