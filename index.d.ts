type WeightedOptions = {
  rand?(): number,
  normal?: any,
  total?: number
};
//
type SimpleSelectArrFunction =
  <S>(
    set: Readonly<Array<S>>) => S;
type SelectArrFunction =
  <S>(
    set: Readonly<Array<S>>,
    weights: Readonly<number[]>,
    options?: WeightedOptions) => S;
type SelectObjFunction =
  <O, K extends keyof O>(
    obj: Readonly<O>,
    options?: WeightedOptions) => K;
type SelectFunction = SimpleSelectArrFunction & SelectArrFunction & SelectObjFunction;
//
type WeightedFunction = SelectFunction & {
  select: SelectFunction,
}
export const select: WeightedFunction;
export default select;
