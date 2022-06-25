export function displayPrice(price) {
    const commission = (price * 100) / 5
    return price + commission
}