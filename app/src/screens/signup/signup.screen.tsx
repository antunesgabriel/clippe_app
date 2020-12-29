import React, {useState} from 'react';
import useKeyboard from '@rnhooks/keyboard';
import {
  Layout,
  Text,
  useStyleSheet,
  useTheme,
  Input,
  Icon,
  Button,
  Spinner,
} from '@ui-kitten/components';
import {
  View,
  TouchableWithoutFeedback,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import Logo from 'src/components/logo/logo.component';
import {useAuth} from 'src/hooks/useAuth';
import {addToast} from 'src/utils/addToast';

import styles from './signup.styles';
import {validationSchema} from './signup.validation';

type SignUpFields = {
  email: string;
  password: string;
  confirmPass: string;
};

function SignUpScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {authLoading, actionSignUp} = useAuth();
  const navigator = useNavigation();
  const [visible] = useKeyboard();
  const screenStyles = useStyleSheet(styles);
  const theme = useTheme();
  const {control, handleSubmit, errors} = useForm<SignUpFields>({
    resolver: yupResolver(validationSchema),
  });

  const toggleSecureEntry = () => setSecureTextEntry((old) => !old);

  const onSubmit = async (credentials: SignUpFields) => {
    await actionSignUp(credentials, callBack);
  };

  const callBack = (err = '', suc = ''): void => {
    if (err) {
      return addToast('Falha ao registrar', err, 'error');
    }

    if (suc) {
      addToast('Concluido!', suc, 'success');
      navigator.goBack();
    }
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={screenStyles.layout}>
      <ScrollView style={{flex: 1}} contentContainerStyle={screenStyles.layout}>
        <StatusBar
          backgroundColor={Platform.OS === 'android' ? '#F4F4F4' : undefined}
          barStyle="dark-content"
          animated
        />
        <View style={styles.box}>
          <Logo
            width={36.79}
            height={39.77}
            balonColor={theme['color-primary-default']}
            clipColor={'#fff'}
          />
          <Text category="h1" style={styles.name}>
            clipes
          </Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({onBlur, onChange, value}) => (
              <Input
                label="Email"
                value={value}
                onChangeText={onChange}
                placeholder="Digite seu e-mail"
                autoCapitalize="none"
                size="large"
                onBlur={onBlur}
                captionIcon={errors.email ? AlertIcon : undefined}
                caption={errors.email?.message}
                keyboardType="email-address"
                style={styles.input}
                status={errors.email ? 'danger' : 'basic'}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                value={value}
                label="Password"
                placeholder="Digite sua senha"
                size="large"
                caption={errors.password?.message}
                accessoryRight={renderIcon}
                captionIcon={errors.password ? AlertIcon : undefined}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                status={errors.password ? 'danger' : 'basic'}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPass"
            defaultValue=""
            render={({onChange, onBlur, value}) => (
              <Input
                value={value}
                label="Confirmação"
                placeholder="Digite novamente sua senha"
                size="large"
                caption={errors.confirmPass?.message}
                accessoryRight={renderIcon}
                captionIcon={errors.confirmPass ? AlertIcon : undefined}
                secureTextEntry={secureTextEntry}
                onChangeText={onChange}
                onBlur={onBlur}
                style={styles.input}
                status={errors.confirmPass ? 'danger' : 'basic'}
              />
            )}
          />

          <Button
            size="large"
            disabled={authLoading}
            style={styles.button}
            accessoryLeft={() =>
              authLoading ? <Spinner status="basic" size="small" /> : <></>
            }
            onPress={handleSubmit(onSubmit)}>
            Continuar
          </Button>
        </View>
        {!visible && (
          <View style={screenStyles.bottom}>
            <Button
              disabled={authLoading}
              appearance="ghost"
              size="large"
              style={styles.button}
              onPress={() => navigator.goBack()}>
              Já possui conta? Faça login!
            </Button>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}

const AlertIcon = (props: any) => (
  <Icon {...props} name="alert-circle-outline" />
);

export default SignUpScreen;
