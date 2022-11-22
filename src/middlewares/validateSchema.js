import httpStatus from '../utils/httpStatus.js';

function validateSchema(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      const errors = {};

      error.details.forEach(({ path, message }) => {
        errors[path] = message;
      });

      res.status(httpStatus.UNPROCESSABLE_ENTITY).send({ errors });
      return;
    }

    req.body = value;

    next();
  };
}

export default validateSchema;
