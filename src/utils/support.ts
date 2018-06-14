import {List, empty, node} from "../datastructures/list"
import { Pair, pair } from "../datastructures/pair";
import { count, reverse } from "./fold";


export let createList = (start: number) => (end: number): List<number> => {
    if (start > end) {
        return empty()
    }
    else {
        return node(start, createList(start+1)(end))
    }
}  

export let creatRandomList = (length: number): List<number> => {
    if (length == 0) {
        return empty()
    }
    else {
        return node(Math.floor(Math.random()*100), creatRandomList(length-1))
    }
}

export let fromArray = <a>(array: Array<a>): List<a> => {
    if (array.length == 0) {
        return empty()
    }
    else {
        return node<a>(array[0], fromArray(array.splice(1)))
    }
}

export let fromString = (message: string): List<string> => {
    if (message == "") {
        return empty()
    }
    else {
        return node<string>(message[0], fromString(message.slice(1)))
    }
}


export let splitAt = <a>(i: number) => (l: List<a>): Pair<List<a>, List<a>> => {
    if (l.kind == "empty") {
        throw "Cannot split empty list"
    }
    else if (i == 0) {
        return pair<List<a>, List<a>>(node(l.value, empty()), l.tail)
    }
    else {
        let t = splitAt<a>(i-1)(l.tail)
        return pair<List<a>, List<a>>(node<a>(l.value, t.first), t.seccond)
    }
}

export let last = <a>(l: List<a>) : a => {
    if (l.kind == "empty") {
        throw "Empty list does not have last element"
    }
    else if (count(l) == 1){
        return l.value
    }
    else {
        return last(l.tail)
    }
}

export let first = <a>(l: List<a>): a => {
    if (l.kind == "empty") {
        throw "Has no first value"
    }
    else {
        return l.value
    }
}

export let index = <a>(n: number) => (l: List<a>): a => {
    if (l.kind == "empty"){
        throw "Out of bounds"
    }
    else {
        if (n == 0) {
            return l.value
        }
        else {
            return index<a>(n-1)(l.tail)
        }
    }
}

export let contains = <a>(v: a) => (l: List<a>): boolean => {
    if (l.kind == "empty") {
        return false
    }
    else {
        if (l.value == v) {
            return true
        }
        else {
            return contains(v)(l.tail)
        }
    }
}

export let compress = <a>(l: List<a>): List<a> => {
    if (l.kind == "empty") {
        return empty()
    }
    else {
        let tmp = compress(l.tail)
        if (!contains(l.value)(tmp)) {
            return node(l.value, tmp)
        }
        else {
            return tmp
        }
    }
}

export let equals = <a>(l1: List<a>) => (l2: List<a>): boolean => {
    if ((l1.kind == "empty" && l2.kind != "empty") || (l1.kind != "empty" && l2.kind == "empty")) {
      return false
    }
    else if (l1.kind == "empty" && l2.kind == "empty") {
      return true
    }
    else if (l1.kind == "node" && l2.kind == "node") {
      return l1.value == l2.value && (equals(l1.tail)(l2.tail))
    }
    else {
      return false
    }
}

export let palindrome = <a>(l: List<a>): boolean => equals(reverse(l))(l)

export let shift = (letter: string) => (offset: number): number => {
    let lowerBound = "a".charCodeAt(0)
    let upperBound = "z".charCodeAt(0)
    let o = offset % 27
    let letterCode = letter.charCodeAt(0) + o
    if (letterCode < lowerBound) {
      return upperBound - (lowerBound - letterCode)
    }
    else if (letterCode > upperBound) {
      return lowerBound + (letterCode - upperBound)
    }
    else {
      return letterCode
    }
}

export let caesarChypher = (text: List<string>) => (offset: number): List<string> => {
    if (text.kind == "empty") {
      return text
    }
    else {
      let c = text.value
      let charCode = c.charCodeAt(0)
      if (charCode >= 97 && charCode <= 122) {
        let encodedChar = String.fromCharCode((shift(c)(offset)))
        return node<string>(encodedChar, caesarChypher(text.tail)(offset))
      }
      else {
        return node<string>(c, caesarChypher(text.tail)(offset))
      }
    }
}

export let filter = <a>(predicate: (x: a) => boolean) => (l: List<a>): List<a> => {
    if (l.kind == "empty") {
        return empty()
    }
    else {
        if (predicate(l.value)) {
            return node(l.value, filter(predicate)(l.tail))
        }
        else {
            return filter(predicate)(l.tail)
        }
    }
}

export let map = <a, b>(f: (x: a) => b) => (l: List<a>): List<b> => {
    if (l.kind == "empty") {
        return empty()
    }
    else {
        return node(f(l.value), map(f)(l.tail))
    }
}

export let apply = <a, b>(f: (x: a) => b) => (x: a): b => f(x)

export let curry = <a, b, c>(f: (x: a) => (y: b) => c) => (x: a) => (y: b): c => f(x)(y)


