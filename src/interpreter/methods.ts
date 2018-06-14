import { Expression } from "./expressions";
import { Memory, lookup, setMemory } from "./memory";
import { stmtToString, Statement } from "./statements";
import { List } from "../datastructures/list";

export let _eval = (expr: Expression) => (stack: Memory): number => {
    if (expr.kind == "val") {
        return expr.value
    }
    else if (expr.kind == "var") {
        return lookup(expr.name)(stack)
    }
    else if (expr.kind == "add") {
        return _eval(expr.left)(stack) + _eval(expr.right)(stack)
    }
    else if (expr.kind == "sub"){
        return _eval(expr.left)(stack) - _eval(expr.right)(stack)
    }
    else if (expr.kind == "mul") {
        return _eval(expr.left)(stack) * _eval(expr.right)(stack)
    }
    else {
        return _eval(expr.left)(stack) / _eval(expr.right)(stack)
    }
}



export let Assignment = (id: string, expr: Expression): Statement => {
    return {
      kind: "assignment",
      var: id,
      expr: expr,
      toString: stmtToString
    }
  }
  
export let Print = (expr: Expression): Statement => {
    return {
      kind: "print",
      expr: expr,
      toString: stmtToString
    }
  }


let runStmt = (stmt: Statement) => (stack: Memory): Memory => {
    let v = _eval(stmt.expr)(stack)
    if (stmt.kind == "assignment") {
        return setMemory(stmt.var)(v)(stack)
    }
    else {
        console.log(v)
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