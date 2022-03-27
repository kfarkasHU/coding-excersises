import { generate } from "./password-generator";

console.log(generate());
console.log(generate(10));
console.log(generate(10, false));
console.log(generate(10, false, false));
console.log(generate(10, true, false));

console.log(generate(10, false, true, false));
console.log(generate(10, false, false, false));
console.log(generate(10, true, false, false));
console.log(generate(10, true, true, false));