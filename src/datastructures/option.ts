import { Functor } from "./functor";
import { fold } from "../utils/fold";

export type Option<a> = {
    kind: "none"
  } | {
    kind: "some",
    value: a
} 
  
export let None = <a>(): Option<a> => { return {kind: "none"} }
export let Some = <a>(v: a): Option<a> => { return { kind: "some", value: v }}


export type Optional<a,b> = Option<a> & Functor<Option<a>, Option<b>, a, b>

export let NoneOptional = <a, b>(): Optional<a, b> => {
  return {kind: "none", map: OptionFunctor<a, b>().map }
}

export let SomeOptional = <a, b>(x: a): Optional<a, b> => {
  return {
    kind: "some",
    value: x,
    map: OptionFunctor<a, b>().map
  }
}

let OptionFunctor = <a, b>(): Functor<Option<a>, Option<b>, a, b> => {
  return {
    map: function(this: Option<a>, f : (x: a) => b): Option<b> {
      if (this.kind == "none") {
        return None<b>();
      }
      else {
        return Some<b>(f(this.value));
      }
    }
  }
}

export let foldOption = <state, a>(f: (s: state) => (x: a) => state) => (accumulator: state) => (option: Option<a>): state => {
  if (option.kind == "none") {
    return accumulator
  }
  else {
    return f(accumulator)(option.value)
  }
}

export let printOption = <a>(option: Option<a>): string => foldOption((s: string) => (x: a) => s + String(x))("")(option)

