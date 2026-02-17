// =================== validate.middleware.js ===================
export const validate =
  (schema, property = 'body') =>
  async (req, res, next) => {
    try {
      await schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true,
      })

      next()
    } catch (error) {
      return res.status(400).json({
        success: false,
        errors: error.errors,
      })
    }
  }
