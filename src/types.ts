// Subtypes and Supertypes
//

type ExistingUser = {
    id: number;
    name: string;
};

type LegacyUser = {
    id?: string | number;
    name: string;
};

type NewUser = {
    name: string;
};
// Issue here is that you are passing in an object literal
// If the User with that id has already been deleted
// Typescript will not know because it thinks that existingUser.id is of a type number
// Using an object type where someone expects a supertype is unsafe but Typescript allows it
// If you expect a shape you can pass in subtypes of the object
// But you cannot pass in supertypes of the object

function deleteUser(user: { id?: number; name: string }) {
    delete user.id;
}
let legacyUser: LegacyUser = {
    id: "238423",
    name: "Lee"
};

let existingUser: ExistingUser = {
    id: 12345,
    name: "Max"
};

deleteUser(existingUser);

// This will not work with object types as id can be of a string | number | undefined
// But deleteUser only handles the case where id is a number | undefined
function deleteUser2(user: LegacyUser) {
    delete user.id;
}

deleteUser2(legacyUser);

const d = { x: 3 };
let a = { x: 3 };
let b: { x: 3 };
let c = { x: 3 } as const;
