import * as Yup from 'yup';

export const VerificationSchema = Yup.object().shape({
  code: Yup.string()
    .min(6, 'Incomplete code')
    .required('Code is required'),
});
