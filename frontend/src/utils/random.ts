import { Random, MersenneTwister19937 } from 'random-js';

const engine = MersenneTwister19937.seed(32);
export const randomGenerator = new Random(engine);

// console.log(randomGenerator.real(0, 1)); 
// console.log(randomGenerator.integer(10, 20)); 