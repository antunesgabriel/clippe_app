import React, {useRef, useEffect} from 'react';
import {Layout, useStyleSheet} from '@ui-kitten/components';
import {Animated, Easing, Platform, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Logo from 'src/components/logo/logo.component';
import {useAuth} from 'src/hooks/useAuth';

import styles from './splash.styles';

function SplashScreen() {
  const fade = useRef(new Animated.Value(0)).current;

  const {initialization} = useAuth();
  const splashStyles = useStyleSheet(styles);
  const navigator = useNavigation();

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade, {
        toValue: 1,
        delay: 200,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      }),
      Animated.timing(fade, {
        toValue: 0,
        delay: 50,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      }),
    ]).start(() => initialization(navigator));
  });

  return (
    <Layout style={splashStyles.layout}>
      <StatusBar
        backgroundColor={Platform.OS === 'android' ? '#6C5CE7' : undefined}
        barStyle="light-content"
        animated
      />
      <Animated.View style={{opacity: fade}}>
        <Logo />
      </Animated.View>
    </Layout>
  );
}

export default SplashScreen;
