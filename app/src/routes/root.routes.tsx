import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from 'src/screens/signin/singin.screen';
import SplashScreen from 'src/screens/splash/splash.screen';
import HomeScreen from 'src/screens/home/home.screen';
import SignUpScreen from 'src/screens/signup/signup.screen';
import ClipScreen from 'src/screens/clip/clip.screen';
import UpdateScreen from 'src/screens/update/update.screen';

const Stack = createStackNavigator();

const RootRoutes = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Splash">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Clip" component={ClipScreen} />
      <Stack.Screen name="Update" component={UpdateScreen} />
    </Stack.Navigator>
  );
};

export default RootRoutes;
