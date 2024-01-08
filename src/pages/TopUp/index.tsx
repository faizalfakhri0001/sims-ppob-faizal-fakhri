import React, { useCallback, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, PaymentModal, SaldoCard, TopUpNominal } from 'components'
import { Color } from 'config'
import { TabScreenProps } from 'types/navigations'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { Ref as RefInput } from 'src/components/Input'
import { topup } from 'store/feature/transaction/actions'

interface Props extends TabScreenProps<'TopUp'> {}

const TopUp: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch  = useAppDispatch();
  const {balance} = useAppSelector(state => state.transaction)
  const [disable, setDisable] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [statusTopup, setStatusTopup] = useState<'start' | 'success' | 'fail'>('start');
  const inputRef = useRef<RefInput>(null);

  const onAmountChange = useCallback((value: string) => {
    if (parseInt(value, 10) >= 10000) {
      setDisable(false)
    } else {
      setDisable(true);
    }
  }, [])

  function dismissModal() {
    setShowModal(false);
  }
  const showTopup = useCallback((value?: number) => {
    if (value) {
      setAmount(value);
    } else {
      setAmount(parseInt(inputRef.current?.getValue() ?? '0', 10))
    }
    setShowModal(true)
  }, [])

  const handleTopUp = useCallback(() => {
    dispatch(topup(amount)).then(res => {
      if (res.meta.requestStatus === 'rejected') {
        setStatusTopup('fail')
      }

      if (res.meta.requestStatus === 'fulfilled') {
        setStatusTopup('success')
      }
    })
  }, [amount])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <SaldoCard amount={balance ?? 0} disableToggle={true} />
          <View>
            <Text allowFontScaling={false} style={styles.enterText}>Silahkan masukkan</Text>
            <Text allowFontScaling={false} style={styles.amountText}>nominal Top Up</Text>
          </View>
          <View>
            <Input
              ref={inputRef}
              leftIcon='cash-100'
              leftIconSize={28}
              keyboardType='number-pad'
              onChangeText={onAmountChange}
              placeholder='masukkan nominal Top Up' />
              <View style={styles.amountContainer}>
                <TopUpNominal amount='10.000' onPress={() => showTopup(10000)}/>
                <TopUpNominal amount='20.000' onPress={() => showTopup(20000)}/>
                <TopUpNominal amount='50.000' onPress={() => showTopup(50000)}/>
                <TopUpNominal amount='100.000' onPress={() => showTopup(100000)}/>
                <TopUpNominal amount='250.000' onPress={() => showTopup(250000)}/>
                <TopUpNominal amount='500.000' onPress={() => showTopup(500000)}/>
              </View>
          </View>
          <Button label='Top Up' disabled={disable} onPress={() => showTopup()}/>

          <PaymentModal
            amount={amount}
            showModal={showModal}
            navigation={navigation}
            statusTopup={statusTopup}
            dismissModal={dismissModal}
            handlePay={handleTopUp}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default TopUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollContainer: {
    paddingTop: 8,
    paddingBottom: 32,
  },
  innerContainer: {
    flex: 1,
    rowGap: 42,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
  },
  enterText: {
    color: Color.black,
    fontSize: 18,
    fontWeight: '400',
  },
  amountText: {
    color: Color.black,
    fontSize: 24,
    fontWeight: '600',
  },
  amountContainer: {
    rowGap: 12,
    paddingVertical: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
})