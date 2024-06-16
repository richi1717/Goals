import * as yup from 'yup'

const schema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
  })
  .required()

export default schema
