import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  userName: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords do not match').required("Confirm password is required"),
});