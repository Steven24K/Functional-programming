export type Expression = {
    kind: "val",
    value: number
} | {
    kind: "var",
    name: string
} | {
     kind: "text",
     message: string
} | {
    kind: "add" | "sub" | "mul" | "div",
    left: Expression,
    right: Expression
}

export let Val = (n: number): Expression => ({kind:"val", value: n})
export let Txt = (msg: string): Expression => ({kind: "text", message: msg})
export let Var = (id: string): Expression => ({kind: "var", name: id})
export let Add = (left: Expression) => (right: Expression): Expression => ({kind:"add", left: left, right: right})
export let Sub = (left: Expression) => (right: Expression): Expression => ({kind:"sub", left: left, right: right})
export let Div = (left: Expression) => (right: Expression): Expression => ({kind:"div", left: left, right: right})
export let Mul = (left: Expression) => (right: Expression): Expression => ({kind:"mul", left: left, right: right})