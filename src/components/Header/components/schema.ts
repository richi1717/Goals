import * as yup from 'yup'

const schema = yup
  .object({
    password: yup
      .string()
      .required('Password is required')
      .min(9, 'Password must be at least 9 characters'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
  })
  .required()

export default schema
