import { Add, Mul, Val, Sub, Var, Txt, Div } from "./src/evaluator/expressions";
import { fromArray, last, createList, fromString, index, palindrome, compress, caesarChypher, splitAt, creatRandomList, filter, map, apply, curry } from "./src/utils/support";
import { Assignment, evaluate, run, Print } from "./src/evaluator/methods";
import { Memory } from "./src/evaluator/memory";
import { Pair, pair } from "./src/datastructures/pair";
import { pairListtoString, reverse, stringify, concat, fold, mapFold, filterFold, flatten, map2, fold2, zip, optionListtoString, map2Safe } from "./src/utils/fold";
import { allNumber, allNumberRev, allEvenRange, allNumberRange, allNumberRangeRev, drawLine, drawSymbols, toBinary, toBase } from "./src/utils/functional";
import { merge, mergeSort } from "./src/utils/algorithms";
import { node, empty } from "./src/datastructures/list";
import { Tree, EmptyTree } from "./src/datastructures/binarytree";
import { createTree, treeToString, mapTree } from "./src/utils/tree-methods";

console.log("______UNIT#1______")

console.log("Exercise 1: " + allNumber(10))
console.log("Exercise 2: "+ allNumberRev(10))
console.log("Exercise 3: " + allNumberRange(5)(10))
console.log("Exercise 4: " + allNumberRangeRev(5)(10))
console.log("Exercise 5: " + allEvenRange(0)(20))
console.log("Exercise 6: " + drawLine(10))
console.log("Exercise 7: " + drawSymbols("^")(10))
console.log("Exercise 8: " + toBinary(20))
console.log("Exercise 9: " + toBase(64)(234))

console.log(drawSymbols("_")(20))

console.log("______UNIT#2______")

let MyList1 = createList(1)(10)
let MyList2 = createList(11)(20)
let MyList3 = fromString("Hello World")
let MyList4 = fromString("regenneger")

console.log("Exercise 1: " + last(MyList1))
console.log("Exercise 2: " + stringify(reverse(MyList1)))
console.log("Exercise 3: " + stringify(concat(MyList1)(MyList2)))
console.log("Exercise 4: " + index(4)(MyList3))
console.log("Exercise 5: " + palindrome(MyList4))
console.log("Exercise 6: " + stringify(compress(MyList4)))
console.log("Exercise 7: " + stringify(caesarChypher(MyList3)(4)))

console.log(drawSymbols("_")(20))

console.log("______UNIT#3______")

let split1 = splitAt(4)(MyList4)
let MyList5 = creatRandomList(20)
console.log("Exercise 1: 1.) " + stringify(split1.first) + " 2.) " + stringify(split1.seccond))
console.log("Exercise 2: " + stringify(merge(MyList1)(MyList2)))
console.log("Exercise 3: " + stringify(mergeSort(MyList5)))

let stack: Memory = empty()

let program = fromArray(
    [
        /*((12+3)-5) * ((24/6)+7) = 110 */
        Assignment("x", Mul(Sub(Add(Val(12))(Val(3)))(Val(5)))(Add(Div(Val(24))(Val(6)))(Val(7)))),
        Assignment("msg", Txt("Hello World, in this tiny imparative programming language in Typescript!!!")),
        Print(Add(Txt("((12+3)-5) * ((24/6)+7) = "))(Var("x"))),
        Print(Var("msg")),
    ]
)

console.log("Exercise 4, 5 and 6: ")
run(program)(stack)

console.log(drawSymbols("_")(20))

console.log("______UNIT#4______")

let MyList6 = node(
    createList(1)(10),
    node(createList(44)(55),
    node(fromArray([2,4,88,2,3,442,32,322,43,]), 
    node(creatRandomList(12), empty())
)))

console.log("Exercise 1: " + stringify(filter((x: number) => x > 5)(MyList1)))
console.log("Exercise 2: " + stringify(map((x: number) => x * 3)(MyList1)))
console.log("Exercise 3: " + fold((state: string) => (x: string) => state + x)("")(caesarChypher(MyList3)(3)))
console.log("Exercise 4: " + apply((x: number) => x +1)(4))
console.log("Exercise 5: " + curry<number, number, string>((x) => (y) => String(x+y))(4)(7))
console.log("Exercise 6: " + stringify(mapFold((x: number) => x * 3)(MyList1)))
console.log("Exercise 7: " + stringify(filterFold((x: number) => x > 5)(MyList1)))
console.log("Exercise 8: " + stringify(flatten(MyList6)))
console.log("Exercise 9: " + stringify(map2((x: number) => (y: number) => x*y)(MyList1)(MyList2)))
console.log("Exercise 10: " + fold2((state: string) => (x: number) => (y: number) => state + x + ";" + y + ", ")("")(MyList1)(MyList2))
console.log("Exercise 11: " + pairListtoString(zip(MyList1)(MyList2)))
console.log("Exercise 12: " + optionListtoString(map2Safe((x: number) => (y: number) => x*y)(MyList1)(MyList2)))

console.log(drawSymbols("_")(20))

console.log("______UNIT#5______")

                      let tree1 = Tree(5, 
              Tree(3, 
    EmptyTree(), EmptyTree()),       Tree(8, 
                                EmptyTree(), EmptyTree()))

let tree2 = createTree(0)(10)(EmptyTree())


console.log("Exercise 1: " + tree1.tryFind(3))
console.log("Exercise 2: " + treeToString(tree2.insert(55)))
console.log("Exercise 3: " + treeToString(tree2))
console.log("Exercise 4: " + treeToString(mapTree((x: number) => x*5)(tree2)))
console.log(drawSymbols("_")(20))