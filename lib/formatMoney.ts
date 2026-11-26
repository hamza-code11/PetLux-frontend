// Currency yahan se ek jagah change hogi (page + invoice dono)
export const CURRENCY = "$";

export const formatMoney = (n: number | string) =>
  `${CURRENCY}${Number(n).toFixed(2)}`;
