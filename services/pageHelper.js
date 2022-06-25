import { tryConvertStringToNumber } from '../services/numberHelper'

export function tryGetPage(url) {

    const searchPage = 'page=';
    const indexOfPage = url.indexOf(searchPage);
    const page = url.substring(indexOfPage + 5)
    return tryConvertStringToNumber(page)
}