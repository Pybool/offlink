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

