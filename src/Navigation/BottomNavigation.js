import React, {useEffect, useReducer, useRef} from 'react';
import {Pressable, StatusBar, StyleSheet, View, Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// svg
import Svg, {Path} from 'react-native-svg';
// reanimated
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
// lottie
import Lottie from 'lottie-react-native';
import {colors} from '../helper/constants';
import Icons from '../helper/Icons';
import Home from '../screen/home/Home';
import Product from '../screen/Product';
// import {Provider} from 'react-redux';
// import store from './src/reducer/store';

// ------------------------------------------------------------------

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ------------------------------------------------------------------

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      tabBar={props => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Dashbord"
        options={{
          // @ts-ignore
          tabBarIcon: ({color}) => (
            <Icons
              type="materialIcon"
              name="home-filled"
              color={color}
              size={36}
            />
          ),
        }}
        component={Home}
      />
      <Tab.Screen
        name="Categories"
        options={{
          // @ts-ignore
          tabBarIcon: ({color}) => (
            <Icons type="AntDesign" name="appstore1" color={color} size={36} />
          ),
        }}
        component={PlaceholderScreen}
      />
      <Tab.Screen
        name="Favourite"
        options={{
          // @ts-ignore
          tabBarIcon: ({color}) => (
            <Icons type="Octicons" name="heart-fill" color={color} size={36} />
          ),
        }}
        component={Product}
      />
      <Tab.Screen
        name="More"
        options={{
          // @ts-ignore
          tabBarIcon: ({color}) => (
            <Icons
              type="feather"
              name="more-vertical"
              color={color}
              size={36}
            />
          ),
        }}
        component={PlaceholderScreen}
      />
    </Tab.Navigator>
  );
};

// ------------------------------------------------------------------

const PlaceholderScreen = () => {
  return <View style={{flex: 1}} />;
};

// ------------------------------------------------------------------

const AnimatedTabBar = ({
  state: {index: activeIndex, routes},
  navigation,
  descriptors,
}) => {
  const {bottom} = useSafeAreaInsets();

  // get information about the components position on the screen -----

  const reducer = (state, action) => {
    // Add the new value to the state
    return [...state, {x: action.x, index: action.index}];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event, index) => {
    dispatch({x: event.nativeEvent.layout.x, index});
  };

  // animations ------------------------------------------------------
  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 0;

    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    const activeLayout = [...layout].find(({index}) => index === activeIndex);
    return activeLayout ? activeLayout.x - 25 : 0;
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{translateX: withTiming(xOffset.value, {duration: 250})}],
    };
  });

  return (
    <View style={[styles.tabBar, {paddingBottom: bottom}]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}>
        <Path
          fill="rgba(255, 0, 0, 0.1)"
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const {options} = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              router={route}
              active={active}
              options={options}
              onLayout={e => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------

const TabBarComponent = ({router, active, options, onLayout, onPress}) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, {duration: 250}),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(1, {duration: 250}),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? (
          options.tabBarIcon({
            ref,
            color: active ? colors.focusedYellow : colors.primBlack,
          })
        ) : (
          <Text>?</Text>
        )}
      </Animated.View>

      {active ? null : (
        <Text
          style={{
            color: colors.gray,
            marginBottom: -10,
            fontSize: 12,
            alignSelf: 'center',
          }}>
          {router.name}
        </Text>
      )}
    </Pressable>
  );
};

// ------------------------------------------------------------------

const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    backgroundColor: 'white',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: '#1E222B',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
});

export default BottomNavigation;
