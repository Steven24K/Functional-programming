import { List, node, empty } from "../datastructures/list";
import { Pair, pair } from "../datastructures/pair";

export type Memory = List<Pair<string, number>>

export let lookup = (id: string) => (stack: Memory): number => {
    if (stack.kind == "empty") {
        throw "Undeclared variable"
    }
    else if (stack.value.first == id) {
        return stack.value.seccond
    }
    else {
        return lookup(id)(stack.tail)
    }
}

export let exists = (id: string) => (stack: Memory): boolean => {
    if (stack.kind == "empty") {
        return false
    }
    else if (stack.value.first == id) {
        return true
    }
    else {
        return exists(id)(stack.tail)
    }
}

export let setMemory = (id: string) => (n: number) => (stack: Memory): Memory => {
    if (stack.kind == "empty") {
        return node(pair(id, n), empty())
    }
    else if (stack.value.first == id) {
        return node(pair(id, n), stack.tail)
    }
    else {
        return node(stack.value, setMemory(id)(n)(stack.tail))
    }
}