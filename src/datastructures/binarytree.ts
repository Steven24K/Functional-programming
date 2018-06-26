import { Option } from "./option";
import { tryFind, insert, mapTree } from "../utils/tree-methods";
import { Functor } from "./functor";

type BinaryTreeData<a> = {
    kind: "empty"
} | {
    kind: "node",
    value: a,
    left: BinaryTree<a>,
    right: BinaryTree<a>
}

interface BinaryTreeMethods<a> {
    tryFind: (this: BinaryTree<a>, value: a) => boolean
    insert: (this: BinaryTree<a>, value: a) => BinaryTree<a>
}

export type BinaryTree<a> = BinaryTreeData<a> & BinaryTreeMethods<a>

let BinaryTree = <a>(tree: BinaryTreeData<a>): BinaryTree<a> => {
    return {...tree, 
        tryFind: function(this: BinaryTree<a>, value: a): boolean {
            return tryFind(value)(this)
        }, 
        insert: function(this: BinaryTree<a>, value: a): BinaryTree<a> {
            return insert(value)(this)
        }
    }
}

export let EmptyTree = <a>(): BinaryTree<a> => {
    return BinaryTree({kind: "empty"})
}

export let Tree = <a>(x: a, left: BinaryTree<a>, right: BinaryTree<a>): BinaryTree<a> => {
    return BinaryTree({kind: "node", value: x, left: left, right: right})
}

let TreeFunctor = <a, b>(): Functor<BinaryTree<a>, BinaryTree<b>, a, b> => {
    return {
      map: function(this: BinaryTree<a>, f: (x: a) => b): BinaryTree<b> {
        return mapTree(f)(this)
      }
    }
  }
  
  export type TreeType<a, b> = BinaryTree<a> & Functor<BinaryTree<a>, BinaryTree<b>, a, b>
  export let TreeTypeClass = <a, b>(t: BinaryTree<a>): TreeType<a, b> => {
    return {...t,
      map: TreeFunctor<a, b>().map
    }
  }