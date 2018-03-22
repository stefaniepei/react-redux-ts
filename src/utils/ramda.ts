import * as R from 'ramda'
const UtilsR = {
  // trim :: String → String
  trim(str) {
    return R.trim(str)
  },

  // difference {a∣a∈xs ∩ a∉ys} :: [a] → [a] → [a]
  difference(listA, listB) {
    return R.difference(listA, listB)
  },
  // without {a∣a∉xs ∩ a∈ys} :: [a] → [a] → [a]
  without(listA, listB) {
    return R.without(listA, listB)
  },
  // update :: Number → a → [a] → [a]
  update(index, val, arr) {
    return R.update(index, val, arr)
  },
  // adjust :: (a → a) → Number → [a] → [a]
  adjust(index, val, arr) {
    return R.adjust(val, index, arr)
  },
  // sum :: [Number] → Number
  sum(filed, arr) {
    return R.compose(R.sum, R.pluck(filed))(arr)
  },
  // pluck :: Functor f => k → f {k: v} → f v
  pluck(filed, arr) {
    return R.pluck(filed)(arr)
  },
  // filter :: Filterable f => (a → Boolean) → f a → f a
  filter(fn, arr) {
    return R.filter(fn, arr)
  },
  // findIndex :: (a → Boolean) → [a] → Number
  findIndex(field, val, arr) {
    return R.findIndex(R.propEq(field, val))(arr)
  },

  // [{}]
  // getFullObjByField :: k -> [a] -> [a] -> {k:v}
  getFullObjByField(findField, partArr, fullArr) {
    return R.filter(R.where({ [findField]: R.contains(R.__, partArr) }))(fullArr)  // tslint:disable-line
  },
  // getAnotherField :: k -> [a] -> [a] -> {k:v} -> v
  getAnotherField(anotherField, findField, partArr, fullArr) {
    return this.pluck(anotherField, this.getFullObjByField(findField, partArr, fullArr))
  },
  // getArrObjByFieldValue :: (k->v->[{k:v}]) -> {k:v}
  getArrObjByFieldValue(field, filedValue, arr) {
    return this.filter(R.propEq(field, filedValue), arr)[0]
  },
  // getArrObjFieldByFieldValue :: k1-> (k->v->[{k:v}]) -> {k1:v1} -> v1
  getArrObjFieldByFieldValue(getField, findField, findFieldValue, arr) {
    return R.prop(getField, this.getArrObjByFieldValue(findField, findFieldValue, arr))
  },

  // {}
  // values :: {k: v} → [v]
  values(obj) {
    return R.values(obj)
  },
  // prop :: s → {s: a} → a | Undefined
  prop(obj) {
    return R.prop(obj)
  },
}

export default UtilsR
