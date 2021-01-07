import React, {useRef, useEffect} from 'react';
import {Layout, useStyleSheet, Spinner} from '@ui-kitten/components';
import {Animated, Easing, Platform, StatusBar} from 'react-native';
import VersionCheck from 'react-native-version-check';
import {useNavigation} from '@react-navigation/native';

import Logo from 'src/components/logo/logo.component';
import {useAuth} from 'src/hooks/useAuth';
import {addToast} from 'src/utils/addToast';

import styles from './splash.styles';

function SplashScreen() {
  const fade = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(0)).current;

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
      Animated.timing(loadingOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
        easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      }),
    ]).start(verifyUpdate);
  });

  const verifyUpdate = async () => {
    try {
      const currentVersion = VersionCheck.getCurrentVersion();

      const latestVersion = await VersionCheck.getLatestVersion({
        provider: Platform.OS === 'android' ? 'playStore' : 'appStore',
      });

      const res = await VersionCheck.needUpdate({
        currentVersion,
        latestVersion,
      });

      // __DEV__ && console.log('VERSIONS', currentVersion, latestVersion);

      initialization &&
        initialization(navigator, res.isNeeded ? res.storeUrl : undefined);
    } catch (err) {
      addToast(
        'Ops!',
        'Não conseguimos verificar se a atualizaçÕes do Clipes App 🥺',
        'info',
      );
      initialization && initialization(navigator, undefined);
    }
  };

  return (
    <Layout style={splashStyles.layout}>
      <StatusBar
        backgroundColor={Platform.OS === 'android' ? '#6C5CE7' : undefined}
        barStyle="light-content"
        animated
        hidden={false}
      />
      <Animated.View style={{opacity: fade}}>
        <Logo />
      </Animated.View>

      <Animated.View style={{opacity: loadingOpacity}}>
        <Spinner size="medium" status="basic" />
      </Animated.View>
    </Layout>
  );
}

export default SplashScreen;
