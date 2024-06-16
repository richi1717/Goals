import * as yup from 'yup'

const min = (num: number, field: string) =>
  `${field} must have at least ${num} characters`

const schema = yup
  .object({
    displayName: yup
      .string()
      .required('Display name is required')
      .min(3, min(3, 'Display name')),
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(9, min(9, 'Password')),
  })
  .required()

export default schema
