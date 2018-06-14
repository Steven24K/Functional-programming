import { List, node } from "../datastructures/list";
import { count } from "./fold";
import { splitAt } from "./support";

export let merge = <a>(l1: List<a>) => (l2: List<a>): List<a> => {
    if (l1.kind == "empty") {
        return l2
    }
    else if (l2.kind == "empty") {
        return l1
    }
    else {
        if (l1.value <= l2.value) {
            return node(l1.value, merge(l1.tail)(l2))
        }
        else {
            return node(l2.value, merge(l1)(l2.tail))
        }
    }
}

export let mergeSort = <a>(l: List<a>): List<a> => {
    if (count(l) == 1) {
        return l
    } 
    else {
        let middle = Math.floor(count(l) / 2 -1)
        let p = splitAt<a>(middle)(l)
        let left = mergeSort(p.first)
        let right = mergeSort(p.seccond)
        return merge(left)(right)
    }
}