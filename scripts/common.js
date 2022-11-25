import * as Combinatorics from 'js-combinatorics';

const permutation = array => [...new Combinatorics.Permutation(array)];
const combination = (array, size) => [...new Combinatorics.Combination(array, size)];
const cartesian = (...array) => [...Combinatorics.CartesianProduct.from(array)];
const powerSet = array => [...new Combinatorics.PowerSet(array)];

export { permutation, combination, cartesian, powerSet };