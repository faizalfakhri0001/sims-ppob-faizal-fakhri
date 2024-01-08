import React from 'react'
import { Color } from 'config'
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  amount: string
} & TouchableOpacityProps

const TopUpNominal: React.FC<Props> = (props) => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Text style={styles.amountText}>Rp{props.amount}</Text>
    </TouchableOpacity>
  )
}

export default TopUpNominal

const styles = StyleSheet.create({
  container: {
    width: '32%',
    borderWidth: 1,
    borderColor: Color.grey,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  amountText: {
    fontSize: 13,
    color: Color.black,
  },
})