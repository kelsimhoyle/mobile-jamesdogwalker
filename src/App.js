/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { AuthContext } from './contexts/AuthContext';


import Amplify, { } from 'aws-amplify';
import Auth from "./auth/Auth";
import config from '../aws-exports';

Amplify.configure({
  ...config
});


import Home from './screens/Home';

const Stack = createNativeStackNavigator();

const App = () => {
  const { currentView, user, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <NavigationContainer>
      <ApplicationProvider {...eva} theme={eva.light}>
        {currentView === 'MainNav' ? (
          <Stack.Navigator initialRoutName="Home">
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        ) : <Auth />}


      </ApplicationProvider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;