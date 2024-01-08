import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'components'
import { Color } from 'config'
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

type Props = {
  amount: number;
  statusTopup: 'start' | 'success' | 'fail'
  showModal: boolean
  dismissModal?: () => void;
  handlePay?: () => void;
  navigation?: any;
}

const PaymentModal = (props: Props) => {
  const {amount, showModal, statusTopup, navigation, dismissModal, handlePay} = props;
  return (
    <Modal
      useNativeDriver
      useNativeDriverForBackdrop
      isVisible={showModal}
      onBackButtonPress={dismissModal}
      onDismiss={dismissModal}>
      <View style={styles.modalContainer}>
        <View style={[styles.checklist, {
          backgroundColor: statusTopup === 'success' ? Color.green : 
          statusTopup === 'fail' ? '#ff5630' : Color.red
        }]}>
          <Icon name={
            statusTopup === 'success' ? 'check' : 
            statusTopup === 'fail' ? 'window-close' : 'wallet'} size={35} color={'white'} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text allowFontScaling={false} style={{fontSize: 16, color: Color.black}}>Top Up sebesar</Text>
          <Text allowFontScaling={false} style={{fontSize: 24, fontWeight: '600', color: Color.black}}>{Intl.NumberFormat('en-ID', {currency: 'IDR', style: 'currency'}).format(amount)}</Text>
          <Text allowFontScaling={false} style={{fontSize: 16, color: Color.black}}>berhasil!</Text>
        </View>
        <View>
          {statusTopup === 'start' ?
            <React.Fragment>
              <Button label='Ya, lanjutkan Bayar' type='text' onPress={handlePay}/>
              <Button label='Batalkan' type='text' textStyle={{color: Color.grey}} onPress={dismissModal}/>
            </React.Fragment> :
            <Button label='Kembali ke beranda' type='text' onPress={() => navigation.replace('Tab', {screen: 'Home'})}/>
          }
        </View>
      </View>
    </Modal>
  )
}

export default PaymentModal

const styles = StyleSheet.create({
  modalContainer: {
    borderRadius: 8,
    rowGap: 18,
    paddingVertical: 24,
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  checklist: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: Color.green,
  },
})