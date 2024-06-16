import * as yup from 'yup'

const schema = yup
  .object({
    currentPassword: yup.string().required('Current password is required'),
    newPassword: yup
      .string()
      .required('New password is required')
      .min(9, 'New password must have at least 9 characters'),
  })
  .required()

export default schema
