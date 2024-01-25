import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from '../helper/Icons';
import {colors} from '../helper/constants';
import {removeFromCart} from '../helper/uttil';

export default function RemoveFromCart({product, animateRemoval}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[styles.circle, {backgroundColor: colors.lightGray}]}
      onPress={() =>
        product.count == 1 ? animateRemoval() : removeFromCart(product)
      }>
      <Icons type="AntDesign" name="minus" color={colors.primBlack} size={12} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 24,
    width: 24,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.darkBlue,
  },
});
