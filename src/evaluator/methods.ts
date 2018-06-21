import { Expression } from "./expressions";
import { Memory, lookup, setMemory } from "./memory";
import { Statement } from "./statements";
import { List } from "../datastructures/list";

export let evaluate = (expr: Expression) => (stack: Memory): any => {
    if (expr.kind == "val") {
        return expr.value
    }
    else if (expr.kind == "var") {
        return lookup(expr.name)(stack)
    }
    else if (expr.kind == "add") {
        return evaluate(expr.left)(stack) + evaluate(expr.right)(stack)
    }
    else if (expr.kind == "sub"){
        return evaluate(expr.left)(stack) - evaluate(expr.right)(stack)
    }
    else if (expr.kind == "mul") {
        return evaluate(expr.left)(stack) * evaluate(expr.right)(stack)
    }
    else if (expr.kind == "div"){
        return evaluate(expr.left)(stack) / evaluate(expr.right)(stack)
    }
    else if (expr.kind == "text") {
        return expr.message
    }
}



export let Assignment = (id: string, expr: Expression): Statement => {
    return {
      kind: "assignment",
      var: id,
      expr: expr
    }
  }
  
export let Print = (expr: Expression): Statement => {
    return {
      kind: "print",
      expr: expr
    }
  }


let runStmt = (stmt: Statement) => (stack: Memory): Memory => {
    if (stmt.kind == "assignment") {
        return setMemory(stmt.var)(evaluate(stmt.expr)(stack))(stack)
    }
    else {
        console.log(evaluate(stmt.expr)(stack))
        return stack
    }
}

export let run = (program: List<Statement>) => (stack: Memory): Memory => {
    if (program.kind == "empty") {
        return stack
    }
    else {
        let memory = runStmt(program.value)(stack)
        return run(program.tail)(memory)
    }
}