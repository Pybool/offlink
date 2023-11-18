import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import { SUPPORTED_CURRENCIES } from "./constants";

export const validateEmail = (email: string) => {
  if (!email) {
    throw new Error("email is empty");
  }
  if (!isEmail(email)) {
    throw new Error("email is invalid");
  }
};

export const validatePassword = (password: string) => {
  if (!password) {
    throw new Error("password is empty");
  }

  if (password.length < 8) {
    throw new Error("password is too short");
  }

  if (!isStrongPassword(password)) {
    throw new Error(
      "password is weak - include alphanumeric characters, uppercase and symbols"
    );
  }
};

export const validateAmount = (amount: number) => {
  if (!amount) throw new Error("amount is not a number");
  if (amount <= 0) throw new Error("amount must be greater than zero");
};

export const validateCurrency = (currency: string) => {
  if (!currency) throw new Error("currency is invalid");
  if (!SUPPORTED_CURRENCIES.includes(currency))
    throw new Error("currency is not supported");
};
