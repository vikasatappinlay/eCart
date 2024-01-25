import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from '../helper/Icons';
import {colors} from '../helper/constants';
import {useSelector} from 'react-redux';

export default function CardHeader({}) {
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
        <View style={{flex: 1}}>
          <Text style={styles.headerTitle}>
            Shopping Cart ({itemStore.length})
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    // backgroundColor: color.primaryColor,
    // paddingHorizontal: SIDE_SPACE,
    paddingBottom: 15,
    height: 100,
  },
  headerTitle: {
    // fontFamily: Font_SourceSansPro_Semibold,
    paddingLeft: 20,
    color: colors.primBlack,
    fontSize: 20,
  },
});
