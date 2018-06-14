type ExpressionData = {
    kind: "val",
    value: number
} | {
    kind: "var",
    name: string
} | {
    kind: "add",
    left: ExpressionData,
    right: ExpressionData
} | {
    kind: "sub",
    left: ExpressionData,
    right: ExpressionData
} | {
    kind: "mul",
    left: ExpressionData,
    right: ExpressionData
  } | {
    kind: "div",
    left: ExpressionData,
    right: ExpressionData
}

export type Expression = ExpressionData & {
      toString: (expr: ExpressionData) => string
}

let exprToString = (expr: ExpressionData): string => {
    if (expr.kind == "val") {
      return expr.value.toString()
     }
    else if (expr.kind == "var") {
      return expr.name
    }
    else if (expr.kind == "add") {
      return `${exprToString(expr.left)} + ${expr.right}`
    }
    else if (expr.kind == "sub") {
      return `${exprToString(expr.left)} - ${expr.right}`
    } 
    else if (expr.kind == "mul") {
      return `${exprToString(expr.left)} * ${expr.right}`
    }
    else {
      return `${exprToString(expr.left)} / ${expr.right}`
    }
}

export let Val = (n: number): Expression => {return {kind: "val", value: n, toString: exprToString}}
export let Var = (id: string): Expression => { return { kind: "var", name: id, toString: exprToString } } 
export let Add = (left: Expression, right: Expression): Expression => { return { kind: "add", left: left, right: right, toString: exprToString } }
export let Sub = (left: Expression, right: Expression): Expression => { return { kind: "sub", left: left, right: right, toString: exprToString } }
export let Mul = (left: Expression, right: Expression): Expression => { return { kind: "mul", left: left, right: right, toString: exprToString } }
export let Div = (left: Expression, right: Expression): Expression => { return { kind: "div", left: left, right: right, toString: exprToString } }
