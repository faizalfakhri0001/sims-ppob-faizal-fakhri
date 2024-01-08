import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from 'assets'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Color } from 'config';

type Props = {
  amount: number
  disableToggle?: boolean;
}

const SaldoCard:React.FC<Props> = (props) => {
  const [showSaldo, setShowSaldo] = useState<boolean>(false);

  function onShowSaldo() {
    setShowSaldo(prev => !prev);
  }
  return (
    <ImageBackground source={Images.bgSaldo} borderRadius={16} resizeMode="cover" style={styles.container}>
      <View style={styles.innerContainer}>
        <Text allowFontScaling={false} style={styles.saldoText}>Saldo anda</Text>
        <Text allowFontScaling={false} style={styles.amountText}>
          {props.disableToggle ? 
            <Text>{new Intl.NumberFormat('en-US', {
              style: "currency",
              currency: "IDR",
              maximumFractionDigits: 2,
            }).format(props.amount).replace('IDR', 'Rp')}</Text> : 
          showSaldo ? 
          <Text>{new Intl.NumberFormat('en-US', {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 2,
          }).format(props.amount).replace('IDR', 'Rp')}</Text> : 
            <Text style={styles.amountHideText}>Rp•••••••</Text>}
        </Text>
        
        {props.disableToggle ? 
          null 
          :
          <Pressable disabled={props.disableToggle} style={styles.viewSaldoContainer} onPress={onShowSaldo}>
            <Text allowFontScaling={false} style={styles.viewSaldoText}>Lihat saldo</Text>
            <Icon name='eye-outline' size={14} color={Color.white}/>
          </Pressable>
        }
      </View>
    </ImageBackground>
  )
}

export default SaldoCard

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
  },
  innerContainer: {
    rowGap: 16,
    paddingHorizontal: 16,
  },
  saldoText: {
    color: Color.white,
    fontSize: 16,
  },
  amountHideText: {
    letterSpacing: 4,
  },
  amountText: {
    color: Color.white,
    fontSize: 32,
    fontWeight: '700',
  },
  viewSaldoContainer: {
    columnGap: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewSaldoText: {
    fontSize: 12,
    color: Color.white,
  },
})