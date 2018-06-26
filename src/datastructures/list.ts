import { Functor } from "./functor";
import { map } from "../utils/support";

export type List<a> = {
    kind: "empty"
} | {
    kind: "node",
    value: a,
    tail: List<a>
}

export let node = <a>(value: a, tail: List<a> ): List<a> => { return {kind: "node", value: value, tail: tail}}

export let empty = <a>(): List<a> => {return {kind: "empty"}}

export type ListType<a, b> = List<a> & Functor<List<a>, List<b>, a, b>

let ListFunctor = <a, b>(): Functor<List<a>, List<b>, a, b> => {
  return {
    map: function(this: List<a>, f: (x: a) => b): List<b> {
      return map(f)(this)
    }
  }
}

export let ListTypeClass = <a, b>(l: List<a>): ListType<a, b> => {
  return {...l,
    map: ListFunctor<a, b>().map
  }
}