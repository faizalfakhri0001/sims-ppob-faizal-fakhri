import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React from 'react'
import { MenuData } from 'config'
import { Service } from 'types/entites'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

type Props = {
  data: Service[]
  onPressMenu: (item: Service) => void
}
type MenuProps = {
  name: string
  image: ImageSourcePropType | undefined
} & TouchableOpacityProps

const Menu:React.FC<MenuProps> = (props) => {
  return (
    <TouchableOpacity {...props} activeOpacity={0.5} style={styles.menuContainer}>
      <Image source={props.image} style={styles.menuIcon}/>
      <Text allowFontScaling={false} style={styles.menuLabel}>{props.name}</Text>
    </TouchableOpacity>
  )
};
const HomeMenu = (props: Props) => {
  if (props.data && props.data.length > 0) {
    return (
      <View style={styles.container}>
        {props.data.map((data, index) => {
          return <Menu 
            key={index}
            onPress={() => props.onPressMenu(data)}
            image={{uri: data.service_icon}}
            name={data.service_name.replace(/(Berlangganan|Voucher|Paket)/g, '')} />
        })}
      </View>
    )
  } else {
    return (
    <React.Fragment>
      {new Array(2).fill(null).map((_, index) => {
        return (
          <SkeletonPlaceholder key={index} borderRadius={4}>
            <SkeletonPlaceholder.Item flexDirection="row" alignItems="center" justifyContent='space-between' flexWrap='wrap'>
              {new Array(5).fill(null).map((_, index2) => {
                return <SkeletonPlaceholder.Item key={index2} width={60} height={60}/>
              })}
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )
      })}
    </React.Fragment>
    )
  }
}

export default HomeMenu

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'center',
  },
  menuLabel: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: '500',
  },
  menuIcon: {
    width: 50,
    height: 50,
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    justifyContent: 'space-evenly',
  },
})