import * as Yup from 'yup';

export const SignupSchema = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
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
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password confirmation  can\'t be blank'),
});

export const VerificationSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, 'Incomplete code')
    .required('Code is required'),
});
