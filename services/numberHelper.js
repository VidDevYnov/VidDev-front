export function tryConvertStringToNumber(stringToConvert) {
    if (isNaN(Number(stringToConvert))) return stringToConvert
    return Number(stringToConvert)
}