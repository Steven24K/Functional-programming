import { Expression } from "./expressions";

export type Statement = {
    kind: "assignment",
    var: string,
    expr: Expression
  } | {
    kind: "print",
    expr: Expression
}