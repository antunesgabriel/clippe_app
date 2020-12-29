import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  email: yup.string().email('Email inválido').required('Digite seu email'),
  password: yup.string().trim().required('Digite sua senha'),
});
