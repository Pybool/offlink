export const convertCurrency = async (
  toCurrency: string,
  fromCurrency: string
): Promise<number | undefined> => {
  try {
    const newNaira = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${fromCurrency}&vs_currencies=${toCurrency}`,
      {
        method: "GET",
      }
    );
    const naira = await newNaira.json();
    return naira?.usd?.ngn;
  } catch (error) {}
};

export const convertUSD = async (
  toCurrency: string,
  amount: number
): Promise<number | undefined> => {
  const exchangerate = await convertCurrency(toCurrency, "usd");

  if (!exchangerate) return 0;

  return exchangerate * amount;
};
