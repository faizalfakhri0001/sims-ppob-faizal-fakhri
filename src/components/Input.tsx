import { Color } from 'config';
import React, { useCallback, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  leftIcon?: string;
  leftIconSize?: number;
  onPressLeftIcon?: () => void;
  rightIcon?: string;
  onPressRightIcon?: () => void;
} & TextInputProps

export type Ref = {
  focus: () => void
  showDanger: (value: boolean) => void
  getValue: () => string
  setValue: (value: string) => void;
}

const Input = React.forwardRef<Ref, Props>((props, ref) => {
  const inputRef = useRef<TextInput>(null)
  const value = useRef<string>('');
  const [isEmpty, setIsEmpty] = useState<boolean>(true);
  const [isDanger, setIsDanger] = useState<boolean>(false);

  const onChangeText = useCallback((text: string) => {
    if (props.onChangeText) {
      props.onChangeText(text)
    }

    value.current = text;
    if (text.length > 0) {
      setIsEmpty(false);
    } else if (text.length === 0) {
      setIsDanger(false);
      setIsEmpty(true);
    }
  }, []);

  useImperativeHandle(ref, () => {
    return {
      focus() {
        inputRef.current?.focus()
      },
      showDanger: (value: boolean) => {
        setIsDanger(value)
      },
      getValue: () => {
        return value.current;
      },
      setValue: (text: string) => {
        value.current = text;
        inputRef.current?.setNativeProps({text});
        setIsEmpty(false)
      },
    }
  }, [setIsDanger])

  return (
    <View style={[styles.container, {borderColor: isDanger ? Color.danger : Color.grey}]}>
      {typeof props.leftIcon === 'string' ?
        <Icon name={props.leftIcon} size={props.leftIconSize ?? 20} color={isDanger ? Color.danger : isEmpty ? Color.grey : Color.black} /> : null
      }
      <TextInput
        {...props}
        ref={inputRef}
        onChangeText={onChangeText}
        placeholderTextColor={Color.grey}
        style={[props.style, styles.input]}
        autoCorrect={false}
      />
      {typeof props.rightIcon === 'string' ?
        <Icon name={props.rightIcon} size={20} onPress={props.onPressRightIcon} color={Color.grey} /> : null
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