export type Option<a> = {
    kind: "none"
  } | {
    kind: "some",
    value: a
}
  
export let None = <a>(): Option<a> => { return {kind: "none"} }
export let Some = <a>(v: a): Option<a> => { return { kind: "some", value: v }}