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
import {colors} from '../../helper/constants';
import Header from '../../component/Header';
import Icons from '../../helper/Icons';
import AddToCard from '../../component/AddToCard';
import {useNavigation} from '@react-navigation/native';
import LikeProduct from '../../component/LikeProduct';

const Home = () => {
  const [recommendedProducts, setProducts] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    getProducts();
  }, []);
  function getProducts() {
    getRequest('https://dummyjson.com/products')
      .then(res => {
        setProducts(res.products);
      })
      .catch(err => console.log(err));
  }
  const offerData = [
    {id: 1, title: 'Offer 1', image: require('../../assets/logo.png')},
    {id: 2, title: 'Offer 2', image: require('../../assets/logo.png')},
    {id: 3, title: 'Offer 3', image: require('../../assets/logo.png')},
    {id: 4, title: 'Offer 4', image: require('../../assets/logo.png')},
    // Add more offer data as needed
  ];

  return (
    <View>
      <View style={styles.topContainer}>
        <Header isHome={true} />
        <View
          style={{
            backgroundColor: colors.darkBlue,
            margin: 30,
            borderRadius: 20,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 20,
          }}>
          <Icons
            type={'AntDesign'}
            name={'search1'}
            size={18}
            color={colors.white}
          />
          <TextInput
            style={{
              height: 45,
              backgroundColor: colors.darkBlue,
              borderRadius: 9,
            }}
            placeholder="Search Products or store"
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 30,
            marginRight: 30,
            height: 38,
          }}>
          <View>
            <Text style={{}}>Delivery to</Text>
            <View styles={{flexDirection: 'row'}}>
              <Text style={[styles.title, {color: colors.white}]}>
                Green Way 3000, Sylhet
                <Icons
                  type={'feather'}
                  name={'chevron-down'}
                  color={'#B2BBCE'}
                  size={20}
                />
              </Text>
            </View>
          </View>
          <View>
            <Text style={{}}>Within</Text>
            <Text style={[styles.title, {color: colors.white}]}>
              1 Hour
              <Icons
                type={'feather'}
                name={'chevron-down'}
                color={'#B2BBCE'}
                size={20}
              />
            </Text>
          </View>
        </View>
      </View>

      <View style={{marginTop: 15, marginBottom: 15}}>
        <FlatList
          data={offerData}
          horizontal
          renderItem={({item}) => (
            <View key={item.id} style={styles.offerArea}>
              <Image source={item.image} style={{width: 50, height: 50}} />
              <View>
                <Text style={[styles.title, {color: colors.white}]}>Get</Text>
                <Text
                  style={[
                    styles.title,
                    {color: colors.white, fontSize: 26, fontWeight: '800'},
                  ]}>
                  50% OFF
                </Text>
                <Text style={[styles.title, {color: colors.white}]}>
                  On first 03 order
                </Text>
              </View>
            </View>
          )}
        />
      </View>

      <Text style={styles.Recommended}>Recommended</Text>
      <ScrollView style={{height: 242 + 100}}>
        <FlatList
          data={recommendedProducts}
          numColumns={2}
          initialNumToRender={2}
          keyExtractor={item => item.id}
          windowSize={2}
          maxToRenderPerBatch={8}
          removeClippedSubviews={true}
          viewabilityConfig={{
            minimumViewTime: 100,
            viewAreaCoveragePercentThreshold: 100,
            waitForInteraction: true,
          }}
          ListEmptyComponent={
            <View style={{alignItems: 'center'}}>
              <Text style={styles.title}> No Products found</Text>
            </View>
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={item.id}
              style={{marginLeft: 15, marginTop: 15}}
              onPress={() => navigation.navigate('pdp', {item})}>
              <Image
                source={{uri: item.thumbnail}}
                style={{width: 168, height: 168, borderRadius: 5}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: 168,
                }}>
                <View style={{width: 130}}>
                  <Text style={styles.title}>${item.price}</Text>
                  <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
                <AddToCard product={item} />
              </View>
              <LikeProduct product={item} />
            </TouchableOpacity>
          )}
          getItemLayout={(data, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
          })}
        />
      </ScrollView>
    </View>
  );
};

export default Home;
const ITEM_SIZE = Dimensions.get('window').width / 2 - 22;

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    color: 'black',
  },
  offerArea: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    margin: 10,
    height: 123,
    width: 269,
    borderRadius: 5,
    backgroundColor: colors.focusedYellow,
  },
  Recommended: {
    color: 'black',
    fontSize: 30,
    marginLeft: 15,
  },
  topContainer: {
    height: 250,
    backgroundColor: colors.lightBlue,
  },
});
