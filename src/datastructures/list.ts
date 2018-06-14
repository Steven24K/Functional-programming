export type List<a> = {
    kind: "empty"
} | {
    kind: "node",
    value: a,
    tail: List<a>
}

export let node = <a>(value: a, tail: List<a> ): List<a> => { return {kind: "node", value: value, tail: tail}}

export let empty = <a>(): List<a> => {return {kind: "empty"}}
