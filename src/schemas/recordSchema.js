import extendedJoi from '../utils/extendedJoi.js';

const GREATER_THAN = 0;

const recordSchema = extendedJoi.object({
  value: extendedJoi.number().integer().greater(GREATER_THAN).required(),
  type: extendedJoi
    .string()
    .trim()
    .htmlStrip()
    .required()
    .valid('input', 'output'),
  description: extendedJoi.string().trim().htmlStrip().required(),
});

export default recordSchema;
