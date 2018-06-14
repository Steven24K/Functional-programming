export let allNumber = (n: number): string => {
    if (n < 0) {
        return ""
    }
    else {
        return allNumber(n-1) + " " + n
    }
}

export let allNumberRev = (n: number): string => {
    if (n < 0) {
        return ""
    }
    else {
        return n + " " + allNumber(n-1)
    }
}

export let allNumberRange = (lower: number) => (upper: number): string => {
    if (lower > upper) {
        return ""
    }
    else {
        return lower + " " + allNumberRange(lower+1)(upper)
    }
}

export let allNumberRangeRev = (lower: number) => (upper: number): string => {
    if (lower > upper) {
        return ""
    }
    else {
        return upper + " " + allNumberRangeRev(lower)(upper-1)
    }
}

export let allEvenRange = (lower: number) => (upper: number): string => {
    if (lower == upper) {
        return ""
    }
    else {
        if (lower % 2 == 0) {
            return lower + " " + allEvenRange(lower+1)(upper)
        }
        else {
            return allEvenRange(lower+1)(upper)
        }
    }
}

export let drawLine = (length: number): string => {
    if (length == 0) {
        return ""
    } 
    else {
        return "*" + drawLine(length-1)
    }
}

export let drawSymbols = (symbol: string) => (length: number): string => {
    if (length == 0) {
        return ""
    }
    else {
        return symbol + drawSymbols(symbol)(length-1)
    }
}

export let toBinary = (n: number): string => {
    if (n <= 0) {
        return ""
    }
    else {
        return toBinary(Math.floor(n/2)) +  n%2
    }
}

export let toBase = (base: number) => (n: number): string => {
    if (n <= 0) {
        return ""
    }
    else {
        return toBase(base)(Math.floor(n/base)) +  n%base
    }
}
