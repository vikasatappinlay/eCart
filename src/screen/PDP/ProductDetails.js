import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {getRequest} from '../../helper/ApiHelper';
import Header from '../../component/Header';
import StarRating from 'react-native-star-rating-widget';
import {colors} from '../../helper/constants';
import Swiper from 'react-native-swiper';
import {addToCard, getOfferPrice} from '../../helper/uttil';
import {useNavigation} from '@react-navigation/native';
import LikeProduct from '../../component/LikeProduct';

const ProductDetails = ({route}) => {
  const {params} = route;
  const [productDetail, setProducts] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getProduct();
  }, []);
  function getProduct() {
    getRequest(`https://dummyjson.com/products/${params.item.id}`)
      .then(res => {
        setProducts(res);
      })
      .catch(err => console.log(err));
  }
  const setRating = val => {
    console.log(val);
  };
  const buyNow = () => {
    addToCard(productDetail), navigation.navigate('cart');
  };
  return (
    <View style={{height: '100%', width: '100%'}}>
      <View style={styles.topContainer}>
        <Header />
        <Text style={[styles.title, {marginTop: 20}]} numberOfLines={1}>
          {productDetail.brand}
        </Text>
        <Text style={styles.Recommended} numberOfLines={1}>
          {productDetail.title}
        </Text>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <StarRating
            rating={productDetail.rating}
            starSize={17}
            color={colors.focusedYellow}
            onChange={setRating}
          />
          <Text style={{color: colors.gray, fontSize: 14}}>110 Reviews</Text>
        </View>
      </View>
      <View style={styles.image}>
        {productDetail?.images?.length > 0 ? (
          <Swiper
            showsButtons={false}
            autoplay={true}
            dotColor={colors.gray}
            dotStyle={{
              height: 3,
              width: 17,
            }}
            activeDotStyle={{
              height: 3,
              width: 17,
            }}
            activeDotColor={colors.focusedYellow}
            paginationStyle={{bottom: 7, left: 20, top: 200, right: '75%'}}>
            {productDetail.images?.map((item, index) => (
              <TouchableOpacity style={styles.slide} key={index}>
                <Image
                  source={{uri: item}}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Text style={styles.Recommended}>{item}</Text>
              </TouchableOpacity>
            ))}
          </Swiper>
        ) : null}
        <LikeProduct product={productDetail} isPDP={true} />
      </View>
      <View
        style={{
          marginLeft: 15,
          flexDirection: 'row',
          paddingTop: 10,
        }}>
        <Text style={styles.dark_blue}>
          ${productDetail.price}
          <Text style={{fontWeight: '400'}}>/Pack</Text>
        </Text>
        <View
          style={{
            backgroundColor: colors.darkBlue,
            borderRadius: 12,
            height: 24,
            width: 84,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: colors.white}}>
            ${getOfferPrice(productDetail)} OFF
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 15,
        }}>
        <TouchableOpacity
          onPress={() => addToCard(productDetail)}
          style={{
            borderColor: colors.darkBlue,
            borderWidth: 1,
            borderRadius: 20,
            height: 56,
            width: 147,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontWeight: '400', color: colors.darkBlue}}>
            Add To Cart
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => buyNow()}
          style={{
            backgroundColor: colors.darkBlue,
            borderRadius: 20,
            height: 56,
            width: 147,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>Buy Now</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={[styles.title, {fontSize: 16}]}>Details</Text>
        <Text style={{fontSize: 16, color: colors.gray, marginLeft: 15}}>
          {productDetail.description}
        </Text>
      </View>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  title: {
    fontSize: 50,
    fontWeight: '300',
    color: 'black',
    marginLeft: 15,
  },
  Recommended: {
    color: 'black',
    fontWeight: '800',
    fontSize: 50,
    marginLeft: 15,
  },
  topContainer: {
    height: 281,
    marginLeft: 5,
  },
  image: {
    height: 207,
    width: '100%',
  },
  dark_blue: {
    color: colors.darkBlue,
    fontSize: 16,
    alignItems: 'center',
    fontWeight: '800',
    marginRight: 8,
  },
});
