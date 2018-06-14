import {List, empty, node} from "../datastructures/list"
import { Pair, pair } from "../datastructures/pair";
import { apply, map } from "./support";
import { Option, None, Some } from "../datastructures/option";

export let fold = <s, a>(f: (state: s) => (x: a) => s) => (accumulator: s) => (list: List<a>): s => {
    if (list.kind == "empty") {
        return accumulator
    }
    else {
        return fold(f)(f(accumulator)(list.value))(list.tail)
    }
}

export let mapFold = <a, b>(f: (x: a) => b) => (l: List<a>): List<b> => fold<List<b>, a>((state: List<b>) => (x: a) => node(f(x), state))(empty<b>())(reverse(l))

export let filterFold = <a>(predicate: (x: a) => boolean) => (l: List<a>): List<a> => {
    return fold((state: List<a>) => (x: a) => {
        if (predicate(x)) {
            return node(x, state)
        }
        else {
            return state
        }
    })(empty())(reverse(l))
}

export let ToArray = <a>(l: List<a>): Array<a> => fold((state: Array<a>) => (x: a) => {state.push(x); return state})([])(l)

export let stringify = <a>(l: List<a>): string => fold((state: string) => (x: a) => state + x + ",")("")(l)

export let pairListtoString = <a, b>(l: List<Pair<a ,b>>): string => fold((state: string) => (x: Pair<a, b>) => state + "(" + x.first + ", " + x.seccond + "), ")("")(l)

export let optionListtoString = <a>(l: List<Option<a>>): string => fold((state: string) => (x: Option<a>) => {
    if (x.kind == "none") {
        return state
    }
    else {
        return state + x.value + ", "
    }
})("")(l)

export let count = <a>(l: List<a>): number => fold((state: number) => (x: a) => state +1)(0)(l)

export let sum = (l: List<number>): number => fold((state: number) => (x: number) => state + x)(0)(l)

export let plus = (l: List<number>) => (n: number): List<number> => mapFold((x: number) => x + n)(l) 

export let times = (l: List<number>) => (n: number): List<number> => mapFold((x: number) => x * n)(l) 

export let divide = (l: List<number>) => (n: number): List<number> => mapFold((x: number) => x / n)(l) 

export let min = (l: List<number>) => (n: number): List<number> => mapFold((x: number) => x - n)(l) 

export let evens = (l: List<number>) => {
    return fold((state: List<number>) => (x: number) => {
        if(x % 2 == 0) {
            return node(x, state)
        } else {
            return state
        }
    })(empty())(reverse(l))
}

export let odd = (l: List<number>) => {
    return fold((state: List<number>) => (x: number) => {
        if(x % 2 != 0) {
            return node(x, state)
        } else {
            return state
        }
    })(empty())(reverse(l))
}

export let reverse = <a>(l: List<a>): List<a> => {
    return fold((state: List<a>) => (x: a) => node(x, state))(empty())(l)
}

export let concat = <a>(l1: List<a>) => (l2: List<a>): List<a> => {
    return fold((state: List<a>) => (x: a) => node(x, state))(l2)(reverse(l1))
}

export let flatten = <a>(l: List<List<a>>): List<a> => {
    return fold((state: List<a>) => (x: List<a>) => concat(state)(x))(empty())(l)
}

export let map2 = <a, b, c>(f: (x: a) => (y: b) => c) => (l1: List<a>) => (l2: List<b>): List<c> => {
    if (count(l1) != count(l2)) {
        throw "Not equal lenght exception"
    }
    else if (l1.kind == "empty" && l2.kind == "empty") {
        return empty()
    }
    else if (l1.kind == "node" && l2.kind == "node") {
        return node(f(l1.value)(l2.value), map2(f)(l1.tail)(l2.tail))
    }
    else {
        throw "Cannot do it, WTF?!?!?! Are you doing??"
    }
}

export let fold2 = <state, a, b>(f: (state: state) => (x: a) => (y: b) => state) => (init: state) => (l1: List<a>) => (l2: List<b>): state => {
    if (count(l1) != count(l2)) {
        throw "Not equal lenght exception"
    }
    else if (l1.kind == "empty" && l2.kind == "empty") {
        return init
    }
    else if (l1.kind == "node" && l2.kind == "node") {
        return fold2(f)(f(init)(l1.value)(l2.value))(l1.tail)(l2.tail)
    }
    else {
        throw "Cannot do it, WTF?!?!?! Are you doing??"
    }
}

export let zip = <a, b>(l1: List<a>) => (l2: List<b>): List<Pair<a, b>> => {
    if (count(l1) != count(l2)) {
        throw "Not equal lenght exception"
    }
    else if (l1.kind == "empty" && l2.kind == "empty") {
        return empty()
    }
    else if (l1.kind == "node" && l2.kind == "node") {
        return node<Pair<a,b>>(pair(l1.value, l2.value), zip<a,b>(l1.tail)(l2.tail))
    }
    else {
        throw "exception"
    }
}

export let map2Safe = <a, b, c>(f: (x: a) => (y: b) => c) =>(l1: List<a>) => (l2: List<b>): List<Option<c>> => {
    if (l1.kind == "empty" && l2.kind == "empty") {
        return empty()
    }
    else if (l1.kind == "empty" && l2.kind != "empty"){
        return map<b, Option<c>>((x: b) => None<c>())(l2)
    }
    else if (l1.kind != "empty" && l2.kind == "empty") {
        return map<a, Option<c>>((x: a) => None<c>())(l1)
    }
    else if (l1.kind != "empty" && l2.kind != "empty") {
        return node(Some(f(l1.value)(l2.value)), map2Safe(f)(l1.tail)(l2.tail))
    }
    else {
        throw "exception"
    }
}