import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  username: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Password can\'t be blank'),
});

export const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Password can\'t be blank'),
});

export const PasswordResetSchema = Yup.object().shape({
  username: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
});

export const NewPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .required('Password can\'t be blank'),
  confirmPassword: Yup.string()
    .min(6, 'Must be at least 6 characters')
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password confirmation  can\'t be blank'),
});
