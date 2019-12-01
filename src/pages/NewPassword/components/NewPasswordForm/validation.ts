import * as Yup from 'yup';

export const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Password can\'t be blank'),
  confirmPassword: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation  can\'t be blank'),
});
