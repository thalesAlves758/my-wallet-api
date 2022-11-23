import extendedJoi from '../utils/extendedJoi.js';

const signInSchema = extendedJoi.object({
  email: extendedJoi.string().trim().htmlStrip().email().required(),
  password: extendedJoi.string().trim().htmlStrip().required(),
});

export default signInSchema;
