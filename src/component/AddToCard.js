import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Icons from '../helper/Icons';
import {colors} from '../helper/constants';
import {addToCard} from '../helper/uttil';

export default function AddToCard({product, isCart}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.circle,
        {backgroundColor: isCart ? colors.lightGray : colors.darkBlue},
      ]}
      onPress={() => addToCard(product)}>
      <Icons
        type="MaterialIcons"
        name="add"
        color={isCart ? colors.primBlack : colors.white}
        size={12}
      />
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
