/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef} from 'react';
import {
  Platform,
  StatusBar,
  View,
  FlatList,
  Animated,
  Easing,
} from 'react-native';
import {Layout, useStyleSheet, Text} from '@ui-kitten/components';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {addToast} from 'src/utils/addToast';
import TopBar from 'src/components/topbar/topbar.component';
import Card from 'src/components/card/card.component';
import CircleButton from 'src/components/circle_button/circle_button.component';
import {useClip} from 'src/hooks/useClip';

import styles from './home.styles';

function HomeScreen() {
  const {clippers, loading, actionList} = useClip();

  const buttonY = useRef(new Animated.Value(200)).current;

  const homeStyles = useStyleSheet(styles);
  const navigator = useNavigation();

  const fetchList = useCallback(async () => {
    await actionList(callBack);
  }, []);

  useEffect(() => {
    animation();
    addToast('Bem vindo', 'Anote para não esquecer! =)', 'success');
    fetchList();
  }, []);

  const animation = () => {
    Animated.sequence([
      Animated.delay(1000),
      Animated.timing(buttonY, {
        toValue: 0,
        delay: 30,
        duration: 1500,
        useNativeDriver: false,
        easing: Easing.bezier(0.165, 0.84, 0.44, 1),
      }),
    ]).start();
  };

  const callBack = (err = '', suc = false): void => {
    if (err) {
      return addToast('Erro', err, 'error');
    }

    if (suc) {
      addToast('Bem vindo', 'Anote para não esquecer! =)', 'success');
    }
  };

  const onPressAdd = () => {
    navigator && navigator.navigate('Clip');
  };

  return (
    <Layout style={homeStyles.layout}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          animated
          barStyle="light-content"
          backgroundColor={Platform.OS === 'android' ? '#6C5CE7' : undefined}
        />

        <TopBar
          title={() => (
            <Text appearance="alternative" category="s1">
              Clipes
            </Text>
          )}
          // subtitle="Anote para não esquecer!"
        />
        {clippers.length ? (
          <FlatList
            data={clippers}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => <Card clip={item} />}
            onRefresh={fetchList}
            refreshing={loading}
          />
        ) : (
          <View style={homeStyles.empty}>
            <Text appearance="alternative">
              Lista de clip vazia, clique em{' '}
              <Text appearance="alternative" style={homeStyles.details}>
                add clip
              </Text>{' '}
              😁.
            </Text>
          </View>
        )}

        <View>
          <Animated.View
            style={{
              width: 'auto',
              transform: [
                {
                  translateY: buttonY,
                },
              ],
            }}>
            <CircleButton onPress={onPressAdd} />
          </Animated.View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}

export default HomeScreen;
