import { CaesarCipher } from "./cipher";
const cipher = new CaesarCipher();

const encryptedbeer = cipher.encrypt("beer");
const decryptedbeer = cipher.decrypt(encryptedbeer);

console.log(encryptedbeer, "ehhu");
console.log(decryptedbeer, "beer");
