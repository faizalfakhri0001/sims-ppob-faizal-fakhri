import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Color } from 'config'
import { Button, Input, PaymentModal, SaldoCard } from 'components'
import { Images } from 'assets'
import { RootScreenProps } from 'types/navigations'
import { Ref as RefInput } from 'src/components/Input'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { transaction } from 'store/feature/transaction/actions'

interface Props extends RootScreenProps<'Pembayaran'> {}

const Pembayaran: React.FC<Props> = (props) => {
  const {navigation, route} = props;
  const dispatch = useAppDispatch();
  const inputRef = useRef<RefInput>(null);
  const {balance} = useAppSelector(state => state.transaction);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [statusTopup, setStatusTopup] = useState<'start' | 'success' | 'fail'>('start');
  
  useEffect(() => {
    inputRef.current?.setValue(route.params.menu?.service_tariff.toString() ?? '');
  }, [route.params.menu]);

  const handleBayar = useCallback(() => {
    dispatch(transaction(route.params.menu?.service_code ?? '')).then(res => {
      if (res.meta.requestStatus === 'rejected') {
        setStatusTopup('fail')
      }

      if (res.meta.requestStatus === 'fulfilled') {
        setStatusTopup('success')
      }
    })
  }, [route.params.menu])

  const showBayar = useCallback((value?: number) => {
    if (value) {
      setAmount(value);
    } else {
      setAmount(parseInt(inputRef.current?.getValue() ?? '0', 10))
    }
    setShowModal(true)
  }, [])

  function dismissModal() {
    setShowModal(false);
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContainer}>
          <SaldoCard amount={balance ?? 0} disableToggle={true} />
          {route.params.menu ?
            <View style={styles.titleContainer}>
              <Text allowFontScaling={false} style={styles.title}>PemBayaran</Text>
              <View style={styles.imageContainer}>
                <Image style={styles.imageIcon} source={{uri: route.params.menu.service_icon}}/>
                <Text allowFontScaling={false} style={styles.imageIconText}>{route.params.menu.service_name}</Text>
              </View>
            </View> : null
          }
          <Input
            ref={inputRef}
            editable={false}
            leftIcon='cash-100'
            leftIconSize={28}
            keyboardType='number-pad'
            style={{color: 'black'}}
            placeholder='masukkan nominal pembayaran' />
          <Button label='Bayar' onPress={() => showBayar(route.params.menu?.service_tariff)}/>

          <PaymentModal
            amount={amount}
            showModal={showModal}
            navigation={navigation}
            statusTopup={statusTopup}
            dismissModal={dismissModal}
            handlePay={handleBayar}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Pembayaran

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
    rowGap: 56,
    backgroundColor: Color.white,
    paddingHorizontal: 16,
  },
  titleContainer: {
    rowGap: 8,
  },
  title: {
    color: Color.black,
    fontSize: 14,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  imageIcon: {
    height: 35,
    width: 35,
  },
  imageIconText: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '700',
  },
})