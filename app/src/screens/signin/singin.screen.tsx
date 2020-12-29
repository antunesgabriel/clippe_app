import React, {useState} from 'react';
import useKeyboard from '@rnhooks/keyboard';
import {
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
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';

import Logo from 'src/components/logo/logo.component';
import {useAuth} from 'src/hooks/useAuth';
import {addToast} from 'src/utils/addToast';

import styles from './signin.styles';
import {validationSchema} from './signin.validation';

type SignInFields = {
  email: string;
  password: string;
};

function SignInScreen() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const {authLoading, actionSignIn} = useAuth();
  const [visible] = useKeyboard();
  const navigator = useNavigation();
  const screenStyles = useStyleSheet(styles);
  const theme = useTheme();
  const {control, handleSubmit, errors} = useForm<SignInFields>({
    resolver: yupResolver(validationSchema),
  });

  const toggleSecureEntry = () => setSecureTextEntry((old) => !old);

  const onSubmit = async (credentials: SignInFields) => {
    await actionSignIn(credentials, callBack);
  };

  const callBack = (err = '', suc = false): void => {
    if (err) {
      return addToast('Falha ao fazer login', err, 'error');
    }

    if (suc) {
      navigator.navigate('Home');
    }
  };

  const renderIcon = (props: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  return (
    <KeyboardAvoidingView
      style={screenStyles.layout}
      contentContainerStyle={screenStyles.layout}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}>
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
            onPress={() => navigator.navigate('SignUp')}>
            Não possui conta? Crie grátis!
          </Button>
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const AlertIcon = (props: any) => (
  <Icon {...props} name="alert-circle-outline" />
);

export default SignInScreen;
