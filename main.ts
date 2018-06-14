import { Add, Mul, Val, Sub, Var } from "./src/interpreter/expressions";
import { fromArray, last, createList, fromString, index, palindrome, compress, caesarChypher, splitAt, creatRandomList, filter, map, apply, curry } from "./src/utils/support";
import { Assignment, _eval, run } from "./src/interpreter/methods";
import { Memory } from "./src/interpreter/memory";
import { Pair, pair } from "./src/datastructures/pair";
import { pairListtoString, reverse, stringify, concat, fold, mapFold, filterFold, flatten, map2, fold2, zip, optionListtoString, map2Safe } from "./src/utils/fold";
import { allNumber, allNumberRev, allEvenRange, allNumberRange, allNumberRangeRev, drawLine, drawSymbols, toBinary, toBase } from "./src/utils/functional";
import { merge, mergeSort } from "./src/utils/algorithms";
import { node, empty } from "./src/datastructures/list";

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

let expr = Add(Mul(Val(3), Val(-2)), Sub(Var("x"), Val(4)))

let testProgram = fromArray(
    [
        Assignment("x", Val(5)),
        Assignment("y", Val(2)),
        Assignment("x", Add(Var("x"), Var("y")))
    ]
)

let emptyMem: Memory = fromArray<Pair<string, number>>([])

console.log("Exercise 4 and 5: " + _eval(expr)(fromArray([ pair("x", 5)] )).toString())
console.log("Exercise 6: " + pairListtoString(run(testProgram)(emptyMem)))

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

console.log("Exercise 1: ")
console.log("Exercise 2: ")
console.log("Exercise 3: ")
console.log("Exercise 4: ")
console.log("Exercise 5: ")
console.log(drawSymbols("_")(20))