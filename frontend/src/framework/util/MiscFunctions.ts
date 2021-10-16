export function truncateString(str: string, num: number): string {
    // If the length of str is less than or equal to num
    // just return str--don't truncate it.
    if (str.length <= num) {
        return str
    }
    // Return str truncated with '...' concatenated to the end of str.
    return str.slice(0, num) + '...'
}

export function convertSingleHexToNumber(singleHexValue:string):number {
    let value = parseInt(singleHexValue);
    if (isNaN(value)) {
        switch (singleHexValue) {
            case 'a': {
                value = 11;
                break;
            }
            case 'b': {
                value = 12;
                break;
            }
            case 'c': {
                value = 13;
                break;
            }
            case 'd': {
                value = 14;
                break;
            }
            case 'e': {
                value = 15;
                break;
            }
            case 'f': {
                value = 16;
                break;
            }
        }

    }
    return value;
}

export function convertHexToNumber(hexValue:string):number {
    let value = 0;
    let firstHexDigit = hexValue.substr(1,1);
    let tensHexDigit = hexValue.substr(0,1);
    value = 10 * convertSingleHexToNumber(tensHexDigit) + convertSingleHexToNumber(firstHexDigit);
    return value;
}

export function isHexValueDark(hexValue:string):boolean {
    let result = false;
    // we are dark if the equivalent rgb value is < 125 for each value
    hexValue = hexValue.toLowerCase();
    if (hexValue.length < 7) return false;

    let redHex = hexValue.substr(1,2);
    let greenHex = hexValue.substr(3,2);
    let blueHex = hexValue.substr(5,2);

    let redValue = convertHexToNumber(redHex);
    let greenValue = convertHexToNumber(greenHex);
    let blueValue = convertHexToNumber(blueHex);

    if ((redValue < 125) && (greenValue < 125) && (blueValue < 125)) {
        result = true;
    }

    return result;
}
