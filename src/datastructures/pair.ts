export interface Pair<a, b> {
    first: a,
    seccond: b
}

export let pair = <a, b>(first: a, seccond: b): Pair<a, b> => {
    return {first: first, seccond: seccond}
}