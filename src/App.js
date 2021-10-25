/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useContext, useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer, IconRegistry } from '@react-navigation/native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

import * as eva from '@eva-design/eva';
import { ApplicationProvider  } from '@ui-kitten/components';
import { AuthContext } from './contexts/AuthContext';

import AuthRoute from './routes/AuthRoute';
import Auth from "./auth/Auth"

import Amplify, { } from 'aws-amplify';
import config from '../aws-exports';

Amplify.configure({
  ...config
});



const App = () => {
  const { currentView, user, checkAuth } = useContext(AuthContext);

  useEffect(() => {
    checkAuth()
  }, [])

  return (
      <NavigationContainer>
      {/* <IconRegistry icons={EvaIconsPack} /> */}

        <ApplicationProvider {...eva} theme={eva.light}>
          {currentView === 'MainNav' ? (
           <AuthRoute />
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