const Joi = require('joi'); 
exports.roomSchemas = Joi.object({
    name: Joi.string().required().min(3).max(50),
})