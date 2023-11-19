export type UserAttributes = {
  email: string;
};

export type Credentials = UserAttributes & {
  password: string;
};

export type PropsWithChildren = {
  children: ReactNode;
};

export type Address = `0x${string}`;

export type Transaction = { id: string; orderId?: number };

export type Currencies = (typeof SUPPORTED_CURRENCIES)[string];

export type Profile = {
  firstname: string;
  surname: string;
  othername: string;
  phone: string;
  bankName: string;
  bankAccount: string;
};
