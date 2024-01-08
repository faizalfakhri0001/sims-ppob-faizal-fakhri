import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color } from 'config';
import moment from 'moment';

type Props = {
  color: string;
  amount: number;
  type: string;
  date: string;
  sign: '+' | '-';
}

const TransactionItem: React.FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Text allowFontScaling={false} style={[styles.amount, {color: props.color}]}>{props.sign} {Intl.NumberFormat('en-ID', {
          currency: 'IDR',
          style: 'currency',
        }).format(props.amount)}</Text>
        <Text allowFontScaling={false} style={styles.type}>{props.type}</Text>
      </View>
        <Text allowFontScaling={false} style={styles.date} >{moment(props.date).format('DD MMMM YYYY  hh:mm') + ' WIB'}</Text>
    </View>
  )
}

export default TransactionItem

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Color.grey,
    justifyContent: 'space-between',
    padding: 8,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amount: {
    fontSize: 20,
    fontWeight: '600',
  },
  date: {
    marginTop: 4,
    color: 'gray',
    fontSize: 12,
  },
  type: {
    color: Color.black,
    fontSize: 12,
  },
})