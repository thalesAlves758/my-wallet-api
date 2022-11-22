import Joi from 'joi';
import sanitizeHtml from 'sanitize-html';

const extendedJoi = Joi.extend((joi) => ({
  type: 'string',
  base: joi.string(),
  rules: {
    htmlStrip: {
      validate(value) {
        return sanitizeHtml(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
      },
    },
  },
}));

export default extendedJoi;
