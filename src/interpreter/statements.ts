import { Expression } from "./expressions";

type StatementData = {
    kind: "assignment",
    var: string,
    expr: Expression
  } | {
    kind: "print",
    expr: Expression
  }
  
export type Statement = StatementData & {
    toString: (stmt: StatementData) => string
}

export let stmtToString = (stmt: StatementData): string => {
  if (stmt.kind == "assignment") {
    return `${stmt.var} = ${stmt.expr.toString()}`
  } else {
    return `print(${stmt.expr})`
  }
}