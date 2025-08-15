export const convertCarPrice = (price: string, bid: number): string => {
    const numericPrice = parseFloat(price.replace(/[$,]/g, ""));

    const converted = numericPrice * bid;

    return converted.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};