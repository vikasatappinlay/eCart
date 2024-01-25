import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icons from '../helper/Icons';
import {colors} from '../helper/constants';
import {useDispatch, useSelector} from 'react-redux';

export default function LikeProduct({product, isPDP}) {
  const {liked} = useSelector(state => state);
  const dispatch = useDispatch();
  const likeProduct = () => {
    let newLiked = liked;
    if (newLiked.includes(product.id)) {
      let index = newLiked.findIndex(obj => obj === product.id);
      newLiked.splice(index, 1);
    } else {
      newLiked.push(product.id);
    }
    dispatch({type: 'LIKED', payload: newLiked});
  };
  const circlePDP = {
    right: 0,
    marginTop: 10,
    backgroundColor: colors.white,
  };
  return (
    <TouchableOpacity
      style={[styles.circle, isPDP ? circlePDP : null]}
      onPress={() => likeProduct()}>
      {liked.includes(product.id) ? (
        <Icons
          type="AntDesign"
          name="heart"
          color={'red'}
          size={isPDP ? 24 : 14}
        />
      ) : (
        <Icons
          type="AntDesign"
          name="hearto"
          color={colors.primBlack}
          size={isPDP ? 24 : 14}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  circle: {
    height: 58,
    width: 58,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 29,
    marginRight: 20,
  },
});
