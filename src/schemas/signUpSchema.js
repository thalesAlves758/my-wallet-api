import extendedJoi from '../utils/extendedJoi.js';

const signUpSchema = extendedJoi.object({
  name: extendedJoi.string().trim().htmlStrip().required(),
  email: extendedJoi.string().trim().htmlStrip().email().required(),
  password: extendedJoi.string().trim().htmlStrip().required(),
  confirmPassword: extendedJoi
    .string()
    .trim()
    .htmlStrip()
    .valid(extendedJoi.ref('password'))
    .required(),
});

export default signUpSchema;
