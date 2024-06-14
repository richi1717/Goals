import * as yup from 'yup'

const schema = yup
  .object({
    amount: yup.number().required('Amount is required'),
  })
  .required()

export default schema
