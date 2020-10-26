// Advanced Types

// Declaring a tuple causes Typescript to be very lenient with the types of the tuple
// It will infer the most general types
// Ignoring the length of the item and the position of the types
let a_ = [1, true]; // (number | boolean)[]

// But sometimes you want to be strict
// You could use type assertions
// or as const assertion but makes it readonly in the process

// If you want to the tuple to be a tuple
// and avoid type assertions
// and avoid narrowing inference
// and readonly modifier

// T is an array of any type
// tuple takes in a variable number of parameters t
function tuple<T extends unknown[]>(...t: T): T {
    return t;
}

let b_ = tuple(1, true); //  [number, boolean]

// Whatever you add to it will be included in the types
// let b_ = tuple(1, true, "hello"); //  [number, boolean, string]

// User-Defined Type Guards

// due to type refinement the scope of a here is not carried over to the new scope
// all typescript knows here is that this function returns a boolean
function isString(a: unknown): boolean {
    return typeof a === "string";
}

// here we are not only telling the typechecker that boolean is true
// but also that it returns a string
function isStringCorrect(a: unknown): a is string {
    return typeof a === "string";
}

function parseString(input: string | number) {
    let formattedInput: string;
    if (isStringCorrect(input)) {
        formattedInput = input.toUpperCase();
    }
}

// Conditional Types
// Declare a type T that depends on types U ad V
// if U is a subtype of V
// then assign T to A
// else assign T to B

type isNumber<T> = T extends number ? true : false;

type A = isNumber<number>; // true
type B = isNumber<string>; // false

// Distributive conditionals
// If you have a conditional type then the expressions on the right are equivalent to
// those on the left

// create a type that converts any to an array of any

type toArray<T> = T[];

type A_ = toArray<string>; // string[]
type B_ = toArray<number>; // number[]
type C_ = toArray<number | boolean | string>; // (string | number | boolean)[]
// issue here is that a union of types does not get turned into an array of each types

type toArrayBetter<T> = T extends unknown ? T[] : T[];

type A__ = toArrayBetter<string>; // string[]
type B__ = toArrayBetter<number>; // number[]
// Here the union types are distributed over the conditionals
// Its like taking the conditional type and mapping over each element
type C__ = toArrayBetter<number | boolean | string>; //  string[] | number[] | false[] | true[]

// Without which computes the types that are in T but not in U

type Without<T, U> = T extends U ? never : T;

// How this is computed
type W = Without<string | boolean | number, number>; // string | boolean
// Step 1:
type W1 =
    | Without<string, number>
    | Without<boolean, number>
    | Without<number, number>;
// Step 2:
// Substitute in the conditional types
type W2 =
    | (string extends number ? never : string)
    | (boolean extends number ? never : boolean)
    | (number extends number ? never : number);

// Step 3:
// Evaluate the conditions
type W3 = string | boolean | never;

// Step 4:
// Simplitfy
type W4 = string | boolean;

// declare generic types as part of a condition

// If you were to split it up and not use infer
// You would have to pass in 2 generic types T and U
// whereas here you do not have to as the typechecker
// infers U based on the context that is being passed in

type ElementValue<T> = T extends (infer U)[] ? U : T;
