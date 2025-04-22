  const currencyFormatter = new Intl.NumberFormat("rw-RW", {
    style: "currency",
    currency: "RWF",
  });
  export const formatCurrency = (value: number) => {
    return currencyFormatter.format(value);
  };