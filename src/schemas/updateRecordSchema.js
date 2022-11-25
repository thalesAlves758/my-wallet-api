import extendedJoi from '../utils/extendedJoi.js';

const GREATER_THAN = 0;

const updateRecordSchema = extendedJoi.object({
  value: extendedJoi.number().integer().greater(GREATER_THAN).required(),
  description: extendedJoi.string().trim().htmlStrip().required(),
});

export default updateRecordSchema;
