// type User = {
//     name: string;
//     age: number;
// }

// let user: User = {
//   name:"Tushar",
//   age:22,
// };

let id: number | string;

id = 10;
id = "abc123";

let statuss: "success" | "error";

statuss = "success"; // ✅
statuss = "error"

let add: (a: number, b: number) => number;

add = (x, y) => x + y;

// console.log(add(1,2))

type User = {
  name: string;
  address?: {
    city: string;
  };
};

const user: User = {
  name: "Tushar",
};

console.log(user.address?.city);

let username = "alice";
username = '42' // Error: Type 'number' is not assignable to type 'string'


// 1. JSON.parse returns 'any' because the structure isn't known at compile time
const data:JSON = JSON.parse('{ "name": "Alice", "age": 30 }');

// 2. Variables declared without initialization
let something;  // Type is 'any'
something = 'hello';
something = 42;  // No error

let value: any = 10;

value = "hello";
value = true;

//  console.log(value.toUpperCase());// ❌ Error

 let x: unknown = "d";
console.log((x as string).length); 