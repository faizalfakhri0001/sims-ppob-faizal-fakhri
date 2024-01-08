import { SafeAreaView, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Color } from 'config'
import { BannerSlider, HomeMenu, SaldoCard } from 'components'
import { useAppDispatch, useAppSelector } from 'src/hooks/redux'
import { getBanners, getServices } from 'store/feature/information/actions'
import { getProfile } from 'store/feature/account/actions'
import { Service } from 'types/entites'
import { TabScreenProps } from 'types/navigations'
import { getBalance } from 'store/feature/transaction/actions'

interface Props extends TabScreenProps<'Home'> {}

const Home: React.FC<Props> = (props) => {
  const {navigation} = props;
  const dispatch = useAppDispatch();
  const {user_profile} = useAppSelector(state => state.account);
  const {banner, services} = useAppSelector(state => state.home);
  const {balance} = useAppSelector(state => state.transaction);

  useEffect(() => {
    if (!user_profile) {
      dispatch(getProfile())
    }
    if (!balance) {
      dispatch(getBalance())
    }
    if (banner.length == 0) {
      dispatch(getBanners()).then(res => {
        if (res.meta.requestStatus === 'rejected') {
          ToastAndroid.show("banner error", 1000);
        }
      })
    }
    if (services.length == 0) {
      dispatch(getServices()).then(res => {
        if (res.meta.requestStatus === 'rejected') {
          ToastAndroid.show("services error", 1000);
        }
      })
    }
  }, [user_profile]);

  const handleMenu = useCallback((menu: Service) => {
    navigation.navigate('Pembayaran', {menu});
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.innerContaienr}>
          <View>
            <Text allowFontScaling={false} style={styles.welcomeText}>Selamat datang,</Text>
            <Text allowFontScaling={false} style={styles.userName}>{`${user_profile?.first_name} ${user_profile?.last_name}`}</Text>
          </View>
          <SaldoCard amount={balance ?? 0} />
          <HomeMenu data={services} onPressMenu={handleMenu}/>
          <BannerSlider data={banner} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  scrollContainer: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
  innerContaienr: {
    flex: 1,
    rowGap: 24,
  },
  welcomeText: {
    fontSize: 20,
    color: Color.black,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: Color.black,
  },
})