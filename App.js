import React from 'react';
import {StatusBar} from 'react-native';
import store from './src/reducer/store';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import RootNavigation from './src/Navigation/RootNaviagtion';
const App = () => {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer>
        <RootNavigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
