import Joi from '@hapi/joi';

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(4).required(),
});

const authResendConfirmLinkSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const authSendResetPasswordLink = Joi.object({
  email: Joi.string().email().lowercase().required(),
});

const authResetPassword = Joi.object({
  password: Joi.string().min(4).required(),
});

const newTransaction = Joi.object({
  nonce:Joi.number().required(),
  cryptocurrency:Joi.string().required(),
  token_amount:Joi.string().required(),
  fiat_currency:Joi.string().required(),
  fiat_amount:Joi.number().required(),
});

const pickTransaction = Joi.object({
  _id: Joi.string().required(),
});

const validations = {
  authSchema,
  authResendConfirmLinkSchema,
  authSendResetPasswordLink,
  authResetPassword,
  newTransaction,
  pickTransaction
}

export default validations