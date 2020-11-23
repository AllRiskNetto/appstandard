import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Login from '../pages/Login';

const Auth = createStackNavigator();

import LaudoRoutes from './Laudo.routes';

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#f5f5f5'},
    }}>
    <Auth.Screen name="Login" component={Login} />
    <Auth.Screen name="Laudo" component={LaudoRoutes} />
  </Auth.Navigator>
);

export default AuthRoutes;
