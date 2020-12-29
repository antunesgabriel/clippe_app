/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  ScrollView,
} from 'react-native';
import {
  Layout,
  useStyleSheet,
  useTheme,
  Text,
  Input,
  Button,
  Spinner,
} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation, useRoute} from '@react-navigation/native';

import Logo from 'src/components/logo/logo.component';
import {useClip} from 'src/hooks/useClip';
import {Clip} from 'src/services/clip.service';
import {addToast} from 'src/utils/addToast';

import styles from './clip.styles';
import {validationSchema} from './clip.validation';

function ClipScreen() {
  const theme = useTheme();
  const clipStyles = useStyleSheet(styles);

  const navigator = useNavigation();
  const {params} = useRoute<any>();

  const {loading, actionCreate, actionUpdate} = useClip();
  const {control, handleSubmit, errors, reset} = useForm<Clip>({
    resolver: yupResolver(validationSchema),
  });

  const onPressCancel = () => {
    navigator.goBack();
  };

  const onSubmit = async (clip: Clip) => {
    if (params && params?.title && params?.content) {
      return await actionUpdate(clip, params?.id, callBack);
    }

    await actionCreate(clip, callBack);
  };

  const callBack = (err = '', suc = false): void => {
    if (err) {
      return addToast('Erro', err, 'error');
    }

    if (suc) {
      addToast(
        'Uhuul \\o/',
        !params?.title
          ? 'Clip adicionado com sucesso!'
          : 'Clip atualizado com sucesso!',
        'success',
      );
      !params?.title ? reset() : onPressCancel();
    }
  };

  return (
    <Layout style={clipStyles.layout}>
      <StatusBar
        animated
        barStyle="dark-content"
        backgroundColor={Platform.OS === 'android' ? '#F4F4F4' : undefined}
      />
      <SafeAreaView style={clipStyles.safeArea}>
        <View style={clipStyles.iconWrapper}>
          <Logo
            width={32.79}
            height={34.07}
            clipColor="#fff"
            balonColor={theme['color-primary-500']}
          />
          <Text category="h2" style={clipStyles.text}>
            Anote para não esquecer!
          </Text>
        </View>
        <ScrollView
          style={{flex: 1}}
          contentContainerStyle={clipStyles.container}>
          <Controller
            name="title"
            control={control}
            defaultValue={params ? params.title : ''}
            render={({onBlur, onChange, value}) => (
              <Input
                size="large"
                label="Titulo"
                placeholder="Digite um titúlo aqui..."
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                caption={errors?.title?.message}
                status={errors.title ? 'danger' : 'basic'}
              />
            )}
          />

          <Controller
            name="content"
            control={control}
            defaultValue={params ? params.content : ''}
            render={({onBlur, onChange, value}) => (
              <Input
                multiline
                label="Conteúdo"
                textStyle={clipStyles.content}
                style={clipStyles.margin}
                caption={errors?.content?.message}
                placeholder="Digite algo aqui..."
                onBlur={onBlur}
                onChangeText={onChange}
                status={errors.content ? 'danger' : 'basic'}
                value={value}
              />
            )}
          />

          <View style={clipStyles.buttons}>
            <Button
              style={clipStyles.button}
              disabled={loading}
              onPress={handleSubmit(onSubmit)}
              accessoryLeft={() =>
                loading ? <Spinner status="basic" size="small" /> : <></>
              }>
              {params?.title ? 'Atualizar' : 'Adicionar'}
            </Button>
            <Button disabled={loading} status="basic" onPress={onPressCancel}>
              Voltar
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}

export default ClipScreen;
