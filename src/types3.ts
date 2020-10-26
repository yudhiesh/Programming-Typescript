// Advanced types
//

type APIResponse = {
  user: {
    userId: string;
    friendList: {
      count: number;
      friends: {
        firstName: string;
        lastName: string;
      }[];
    };
  };
};

// In order to get the type of friends list you could key in to the type

type FriendList = APIResponse["user"]["friendList"];

// Type of an individual friend
// number is a way to key into any shape
type IndividualFriend = FriendList["friends"][number];

// keyof is used to get all of an objects keys as a union of string literal types

type ResponseKey = keyof APIResponse; // user

type UserKeys = keyof APIResponse["user"]; // "userId" | "friendList"

type FriendsListKeys = keyof FriendList; // "count" | "friends"

type IndividualFriendsKeys = keyof IndividualFriend; // "firstName" | "lastName"

// Getter function using keyin and keyof

// O is an object
// K is the union of string literals if the keys of O and extends it

function get<O extends object, K extends keyof O>(o: O, k: K): O[K] {
  return o[k];
}

// overload the get()

type Get = {
  <O extends object, K1 extends keyof O>(o: O, k1: K1): O[K1];
  <O extends object, K1 extends keyof O, K2 extends keyof O[K1]>(
    o: O,
    k1: K1,
    k2: K2
  ): O[K1][K2];
  <
    O extends object,
    K1 extends keyof O,
    K2 extends keyof O[K1],
    K3 extends keyof O[K1][K2]
  >(
    o: O,
    k1: K1,
    k2: K2,
    k3: K3
  ): O[K1][K2][K3];
};

// let getOverload: Get = (object: any, ...keys: string[]) => {
//     let result = object;
//     result.forEach(k => (result = result[k]));
//     return result;
// };

// Record type which acts as a map

let nextDay: Record<Weekday, Day> = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thu",
  Thu: "Fri",
  Fri: "Sat",
};

// Mapped Types

let nextDay2: { [K in Weekday]: Day } = {
  Mon: "Tue",
  Tue: "Wed",
  Wed: "Thu",
  Thu: "Fri",
  Fri: "Sat",
};

// Record uses a mapped type as well
// It allows for the mapping over of an objects keys and value types
// More powerful than the built in types that Typescript has
//

type any_ = keyof any; // string | number | symbol

type RecordExample<K extends keyof any, T> = {
  [P in K]: T;
};

// Power of mapped types

type User = {
  id: number;
  isSignedIn: boolean;
  cart: string[];
};

// Partial<Object>
// Make all fields optional
type OptionalUser = {
  [K in keyof User]?: User[K];
};

// Make all fields nullable
type NullUser = {
  [K in keyof User]: User[K] | null;
};

// Readonly<Object>
// Make all fields read-only
type ReadOnlyUser = {
  readonly [K in keyof User]: User[K];
};

// Make all fields writable again
type WritableUser = {
  -readonly [K in keyof ReadOnlyUser]: User[K];
};

// Required<Object>
// Make all fields required again
type RequiredUser = {
  [K in keyof OptionalUser]-?: User[K];
};
