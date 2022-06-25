export function displayPrice(price) {
    const commission = (price * 5) / 100
    return Math.round(price + commission)
}