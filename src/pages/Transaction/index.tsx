import { FlatList, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Color } from 'config'
import { SaldoCard, TransactionItem } from 'components'
import { TabScreenProps } from 'types/navigations'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { getTransactionHistory } from 'store/feature/transaction/actions'
import { History } from 'types/entites'

interface Props extends TabScreenProps<'Transaction'> {}

const Transaction: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {history} = useAppSelector(state => state.transaction)
  const {balance} = useAppSelector(state => state.transaction)

  useEffect(() => {
    if (history.records?.length === 0) {
      dispatch(getTransactionHistory({limit: 5, offset: 0}))
    }
  }, [history])

  const showMore = useCallback(() => {
    if ((history.records?.length ?? 0) > 0) {
      const newOffset = parseInt(history?.offset ?? '0', 10) + 1;
      dispatch(getTransactionHistory({limit: 5, offset: newOffset}))
      .then((res: any) => {
        if (res.meta.requestStatus === 'rejected') {
          ToastAndroid.show(res.payload.message, 1000)
        }
      })
    }
  }, [history])

  const renderItem = useCallback(({item}: {item: History}) => {
    if (history.records?.length === 0) {
      return null
    }
    return <TransactionItem 
      color={item.transaction_type === 'PAYMENT' ? Color.salmon : Color.leaf} 
      sign={item.transaction_type === 'PAYMENT' ? '-' : '+'} 
      amount={item.total_amount}
      date={item.created_on} 
      type={item.description}
    />
  }, [history])
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <SaldoCard amount={balance ?? 0} disableToggle={true} />
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Transaksi</Text>
          <FlatList
            data={history.records ? history.records : []}
            contentContainerStyle={{
              rowGap: 32,
              paddingBottom: 50,
            }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <TouchableOpacity activeOpacity={0.7} style={styles.showmoreContainer} onPress={showMore}>
                <Text allowFontScaling={false} style={styles.showmoreText}>Show more</Text>
              </TouchableOpacity>
            }
            ListEmptyComponent={<Text style={{color: Color.grey}}>Maaf tidak ada history transaksi saat ini</Text>}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Transaction

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  innerContainer: {
    flex: 1,
    rowGap: 56,
    backgroundColor: Color.white,
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  listContainer: {
    flex: 1,
    rowGap: 28,
  },
  listTitle: {
    color: Color.black,
    fontSize: 14,
    fontWeight: '600',
  },
  showmoreContainer: {
    alignItems: 'center',
  },
  showmoreText: {
    color: Color.salmon,
    fontSize: 16,
    paddingVertical: 8,
  },
})