import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import CardHeader from '../../component/CardHeader';
import {useSelector} from 'react-redux';
import {colors} from '../../helper/constants';
import AddToCard from '../../component/AddToCard';
import RemoveFromCart from '../../component/RemoveFromCart';
import {getTotal, removeFromCart} from '../../helper/uttil';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';

const ProductItem = ({item, removeProduct}) => {
  const translateX = useSharedValue(0);

  const removeAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translateX.value}],
    };
  });

  const animateRemoval = () => {
    translateX.value = withTiming(-1000, {duration: 500, easing: Easing.ease});
    setTimeout(() => {
      removeProduct();
    }, 500); // Wait for the animation to complete before removing the item
  };

  return (
    <Animated.View style={[styles.itemRow, removeAnimatedStyle]}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: item.thumbnail}}
          style={{width: 50, height: 50, borderRadius: 5}}
        />
        <View style={{marginLeft: 30}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.title}>${item.price}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <RemoveFromCart
          key={item.id}
          product={item}
          animateRemoval={() => animateRemoval(item)}
        />
        <Text style={styles.title}>{item.count}</Text>
        <AddToCard product={item} isCart={true} />
      </View>
    </Animated.View>
  );
};
const Cart = ({}) => {
  const {itemStore} = useSelector(state => state);
  const removeProduct = product => {
    removeFromCart(product);
  };
  const renderItem = ({item}) => (
    <ProductItem item={item} removeProduct={() => removeProduct(item)} />
  );
  return (
    <View style={{margin: 20}}>
      <CardHeader />
      <View style={{height: '64%'}}>
        <FlatList
          data={itemStore}
          ListEmptyComponent={() => (
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}>Empty Cart</Text>
            </View>
          )}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{width: '100%'}}>
        <Text style={{color: colors.darkBlue, textAlign: 'right'}}>Edit</Text>
      </View>
      <View
        style={{
          width: '100%',
          backgroundColor: colors.lightGray,
          borderRadius: 20,
          padding: 10,
          alignContent: 'flex-start',
        }}>
        <View style={styles.amountRow}>
          <Text style={[styles.amount, {fontSize: 16}]}>Subtotal</Text>
          <Text style={styles.amountNumbers}>${getTotal()}</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={[styles.amount, {fontSize: 16}]}>Delivery</Text>
          <Text style={styles.amountNumbers}>$2</Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={[styles.amount, {fontSize: 16}]}>Total</Text>
          <Text style={styles.amountNumbers}>${getTotal() + 2}</Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.darkBlue,
            borderRadius: 20,
            height: 56,
            width: 327,
            marginTop: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Proceed To checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    color: 'black',
  },
  itemRow: {
    height: 80,
    width: '100%',
    borderBottomColor: colors.lightGray,
    borderBottomWidth: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  amount: {
    fontSize: 50,
    fontWeight: '300',
    color: '#616A7D',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountNumbers: {
    fontSize: 16,
    color: colors.primBlack,
    marginLeft: 15,
  },
});
