import Toast from 'react-native-toast-message';

export const defaultTitles = {
  anErrorOcurred: 'Atenção, ocorreu um erro!',
  success: 'Ação realizada com sucesso!',
};

type Types = 'success' | 'info' | 'error';

export const addToast = (
  title: string,
  message: string,
  type: Types,
  duration = 3500,
) => {
  Toast.show({
    type: type,
    text1: title,
    text2: message,
    autoHide: true,
    position: 'top',
    visibilityTime: duration,
    topOffset: 60,
    bottomOffset: 20,
  });
};
