// Error handling
class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

function ask() {
    return prompt("When is your birthday?");
}

function isValid(date: Date): boolean {
    return (
        Object.prototype.toString.call(date) === "[object Date]" &&
        !Number.isNaN(date.getTime())
    );
}

function parse(
    birthday: string
): Date | InvalidDateFormatError | DateIsInTheFutureError {
    const date = new Date(birthday);
    if (!isValid(date)) {
        throw new RangeError("Enter a date in the form of YYYY/MM/DD");
    } else {
        return date;
    }
}

// Encode likely exceptions in parse signatures
// Communicate to consumers which specific exceptions will be thrown
// Force developers to rethrow or handle each of the errors

let result = parse(ask());
if (result instanceof InvalidDateFormatError) {
    console.error(result.message);
} else if (result instanceof DateIsInTheFutureError) {
    console.error(result.message);
} else {
    console.info("Date is", result.toISOString);
}

// Using Options like in Rust
// But this still does not tell the developer to handle what error
// They still have to figure it out by checking out the function
function ask2() {
    let result = prompt("When is your birthday?");
    if (result === null) {
        return [];
    } else {
        return [result];
    }
}

function parse2(birthday: string): Date[] {
    const date = new Date(birthday);
    if (!isValid(date)) {
        return [];
    } else {
        return [date];
    }
}

let date = parse2(ask());

date.map(_ => _.toISOString()).forEach(_ => console.info(`Date is ${_}`));
