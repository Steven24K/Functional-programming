import { BinaryTree, Tree, EmptyTree } from "../datastructures/binarytree";

export let tryFind = <a>(value: a) => (tree: BinaryTree<a>): boolean => {
    if (tree.kind == "empty") {
        return false
    }
    else {
        if (value == tree.value) {
            return true
        }
        else if (value <= tree.value) {
            return tryFind(value)(tree.left)
        }
        else {
             return tryFind(value)(tree.right)
        }
    }
}

export let insert = <a>(value: a) => (tree: BinaryTree<a>): BinaryTree<a> => {
    if (tree.kind == "empty") {
        return Tree(value,EmptyTree(), EmptyTree())
    }
    else if (value <= tree.value) { 
        return Tree(tree.value, insert(value)(tree.left), tree.right)
    }
    else {
        return Tree(tree.value, tree.left, insert(value)(tree.right))
    }
}

export let createTree = (start: number) => (end: number) => (tree: BinaryTree<number>): BinaryTree<number> => {
    if (start == end) {
        return tree
    }
    else {
        return createTree(start+1)(end)(tree.insert(start))
    }
}

export let inorderFold = <a, state>(f: (s: state) => (x: a) => state) => (init: state) => (tree: BinaryTree<a>): state => {
    if (tree.kind == "empty") {
        return init
    }
    else {
        let left = inorderFold(f)(init)(tree.left)
        let current = f(left)(tree.value)
        let right = inorderFold(f)(current)(tree.right)
        return right
    }
}

export let treeToString = <a>(tree: BinaryTree<a>): string => inorderFold((s: string) => (x: a) => s + ", " + x)("")(tree)

export let mapTree = <a, b>(f: (x: a) => b) => (tree: BinaryTree<a>): BinaryTree<b> => inorderFold((s: BinaryTree<b>) => (x: a) => s.insert(f(x)))(EmptyTree<b>())(tree)