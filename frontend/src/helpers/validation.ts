import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";
import isStrongPassword from "validator/lib/isStrongPassword";
import { SUPPORTED_CURRENCIES } from "./constants";



export const validateEmail = (email: string) => {
  if (!email) {
    throw new Error("Email is empty");
  }
  if (!isEmail(email)) {
    throw new Error("Email is invalid");
  }
};
export const validatePhone = (phoneNo: string) => {
  if (!phoneNo) {
    throw new Error("Phone number is empty");
  }
  if (!isMobilePhone(phoneNo)) {
    throw new Error("Phone number is invalid");
  }
};

export const validatePassword = (password: string) => {
  if (!password) {
    throw new Error("Password is empty");
  }

  if (password.length < 8) {
    throw new Error("Password is too short");
  }

  if (!isStrongPassword(password)) {
    throw new Error(
      "Password is weak - include alphanumeric characters, uppercase and symbols"
    );
  }
};

export const validateAmount = (amount: number) => {
  if (!amount) throw new Error("amount should be in number");
  if (amount <= 0) throw new Error("amount must be greater than zero");
};

export const validateCurrency = (currency: string) => {
  if (!currency) throw new Error("currency is invalid");
  if (!SUPPORTED_CURRENCIES.includes(currency))
    throw new Error("currency is not supported");
};
