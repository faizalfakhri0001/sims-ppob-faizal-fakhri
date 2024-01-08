import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BannerData, Color } from 'config'
import { Banner } from 'types/entites'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

type Props = {
  data: Banner[]
}

const BannerSlider = (props: Props) => {
  if (props.data && props.data.length > 0) {
    return (
      <View>
        <Text allowFontScaling={false} style={styles.title}>Temukan promo menarik</Text>
        <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
          {props.data.length > 0 ? props.data.map((data, index) => {
            return <Image key={index} borderRadius={12} source={{uri: data.banner_image}} style={styles.banner} />
          }) : <Text style={{color: 'black'}}>banner tidak ditemukan</Text>}
        </ScrollView>
      </View>
    )
  } else {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        <SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item width={160} height={30} marginBottom={12}/>
          <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" gap={12}>
            {new Array(2).fill(null).map((_, index2) => {
              return <SkeletonPlaceholder.Item key={index2} width={200} height={100}/>
            })}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    )
  }
}

export default BannerSlider

const styles = StyleSheet.create({
  scrollContainer: {
    columnGap: 12,
  },
  title: {
    color: Color.black,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  banner: {
    height: 120,
    width: 250,
  },
})