import {createStackNavigator} from '@react-navigation/stack';
import ProductDetails from '../screen/PDP/ProductDetails';
import BottomNavigation from './BottomNavigation';
import React from 'react';
import Cart from '../screen/cart/Cart';

const {Navigator, Screen} = createStackNavigator();
export default function RootNavigation() {
  return (
    <Navigator>
      <Screen
        options={{
          headerShown: false,
        }}
        name="home"
        component={BottomNavigation}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="pdp"
        component={ProductDetails}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name="cart"
        component={Cart}
      />
    </Navigator>
  );
}
