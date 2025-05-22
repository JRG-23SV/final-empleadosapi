const Joi = require('joi');

const empleadoSchema = Joi.object({
  nombre: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El nombre es obligatorio.',
      'string.min': 'El nombre debe tener al menos 2 caracteres.',
      'any.required': 'El nombre es requerido.'
    }),

  apellido: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.empty': 'El apellido es obligatorio.',
      'string.min': 'El apellido debe tener al menos 2 caracteres.',
      'any.required': 'El apellido es requerido.'
    }),

  edad: Joi.number()
    .integer()
    .min(18)
    .max(65)
    .required()
    .messages({
      'number.base': 'La edad debe ser un número.',
      'number.min': 'La edad mínima permitida es 18.',
      'number.max': 'La edad máxima permitida es 65.',
      'any.required': 'La edad es requerida.'
    }),

  departamento: Joi.string()
    .required()
    .messages({
      'string.empty': 'El departamento es obligatorio.',
      'any.required': 'El departamento es requerido.'
    }),

  salario: Joi.number()
    .positive()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El salario debe ser un número.',
      'number.positive': 'El salario debe ser un número positivo.',
      'any.required': 'El salario es requerido.'
    })
});

module.exports = empleadoSchema;