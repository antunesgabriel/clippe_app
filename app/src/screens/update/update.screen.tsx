import React from 'react';
import {View, SafeAreaView, StatusBar, Linking} from 'react-native';
import {useStyleSheet, useTheme, Text, Button} from '@ui-kitten/components';
import {useRoute} from '@react-navigation/native';

import {styles} from './update.styles';
import Logo from 'src/components/logo/logo.component';

function UpdateScreen() {
  const screenStyles = useStyleSheet(styles);
  const theme = useTheme();

  const routes = useRoute<any>();

  const onPressUpdate = async () => {
    Linking.openURL(routes?.params?.storeLink);
  };

  return (
    <View style={screenStyles.container}>
      <StatusBar barStyle="dark-content" animated backgroundColor="#F4F4F4" />
      <SafeAreaView style={screenStyles.safeArea}>
        <View style={screenStyles.safeArea}>
          <Logo
            width={32.79}
            height={34.07}
            clipColor="#fff"
            balonColor={theme['color-primary-500']}
          />

          <View style={screenStyles.content}>
            <Text category="h2" style={screenStyles.title}>
              Novidades!
            </Text>

            <Text style={screenStyles.describe}>
              O Clipes App recebeu um nova atualização!
            </Text>

            <Text style={screenStyles.describe}>
              Venha ver o que temos de novidades 😜
            </Text>

            <Button
              style={screenStyles.button}
              size="large"
              disabled={!routes?.params?.storeLink}
              onPress={onPressUpdate}>
              Atualizar
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default UpdateScreen;
