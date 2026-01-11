export const formatPrice = (price) => {
    if(price < 0.01) return price.toFixed(8);

    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigit: 2,
        maximumFractionDigit: 2,
    }).format(price);
}