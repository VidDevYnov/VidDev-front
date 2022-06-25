export function displayPrice(price) {
    const commission = (price * 5) / 100
    return (Math.round((price + commission) * 100) / 100).toFixed(2);

}

export function setCommition(price) {
    return (Math.round(((price * 5) / 100) * 100) / 100).toFixed(2);

}

export function setPoint(price) {
    return Math.round((price * 10) / 100)
}

export function setRemise(price, remise) {

    return (price - (remise * price) / 100).toFixed(2);
}