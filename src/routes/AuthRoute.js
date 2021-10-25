import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import BottomNav from '../components/BottomNav';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

const AuthRoute = () => (
    <Navigator
        tabBar={props => <BottomNav {...props} />}
        initialRouteName='Home'
    >
        <Screen name="Home" component={Home} />
        <Screen name="Home2" component={Home} />
        <Screen name="Home3" component={Home} />

    </Navigator >
);

export default AuthRoute;