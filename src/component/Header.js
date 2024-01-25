import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from '../helper/Icons';
import {colors} from '../helper/constants';
import {useSelector} from 'react-redux';

export default function Header({isHome}) {
  const navigation = useNavigation();
  const {itemStore} = useSelector(state => state);

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 52,
        }}>
        {isHome ? (
          <View style={{flex: 1}}>
            <Text style={styles.headerTitle}>Hey, John Doe</Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              padding: 7,
              backgroundColor: colors.lightGray,
            }}>
            <Icons
              type="Ionicons"
              name="chevron-back"
              color={colors.primBlack}
              size={25}
            />
          </TouchableOpacity>
        )}
        <View style={{flex: 1}}></View>
        <TouchableOpacity
          onPress={() => navigation.navigate('cart')}
          style={{flexDirection: 'row', height: 30, width: 30}}>
          <Icons
            type="materialCommunityIcons"
            name="shopping-outline"
            color={isHome ? colors.white : colors.primBlack}
            size={25}
          />
          <View
            style={{
              backgroundColor: colors.focusedYellow,
              height: 20,
              width: 20,
              position: 'absolute',
              borderRadius: 10,
              right: 0,
              top: 0,
              alignItems: 'center',
            }}>
            <Text style={{color: colors.white}}>{itemStore.length}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: color.primaryColor,
    // paddingHorizontal: SIDE_SPACE,
    padding: 10,
    paddingBottom: 15,
    height: 100,
  },
  headerTitle: {
    // fontFamily: Font_SourceSansPro_Semibold,
    color: colors.white,
    fontSize: 20,
  },
});
