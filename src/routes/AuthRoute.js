import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Walk from "../screens/Walk";
import BottomNav from '../components/BottomNav';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator();

const AuthRoute = () => (
    <Navigator
        tabBar={props => <BottomNav {...props} />}
        initialRouteName='Home'
    >
        <Screen name="Home" component={Home} />
        <Screen name="Walk" component={Walk} />
        <Screen name="Home3" component={Home} />

    </Navigator >
);

export default AuthRoute;