/**
 * @format
 */

import { AppRegistry } from 'react-native';
import React from "react";
import App from './src/App';
import { name as appName } from './app.json';
import { AuthProvider } from "./src/contexts/AuthContext"

const AuthApp = () => (
    <AuthProvider>
        <App />
    </AuthProvider>
)

AppRegistry.registerComponent(appName, () => AuthApp);
