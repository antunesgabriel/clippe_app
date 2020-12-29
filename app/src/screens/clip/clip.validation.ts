import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, 'O titúlo deve ter no minimo 3 carácters')
    .required('De um titúlo ao seu conteúdo.'),
  content: yup
    .string()
    .trim()
    .min(5, 'O conteúdo deve ter no minimo 5 carácters')
    .max(255, 'O conteúdo não pode ter mais de 255 caracters')
    .required('Digite ou cole algum conteúdo.'),
});
