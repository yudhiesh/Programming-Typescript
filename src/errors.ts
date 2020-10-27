// Handling Errors

// Returning Exceptions
class InvalidDateFormatError extends RangeError {}
class DateIsInTheFutureError extends RangeError {}

// Add the return types of the errors to the function as a union

function parse(
    birthday: string
): Date | InvalidDateFormatError | DateIsInTheFutureError {
    let date = new Date(birthday);
    if (!date) {
        return new InvalidDateFormatError(
            "Enter a date in the form YYYY/MM/DD"
        );
    }
    if (date.getTime() > Date.now()) {
        return new DateIsInTheFutureError("Are you a time lord?");
    }
    return date;
}

// A consumer of the data is forced to handle the errors!
// This approach is verbose but gives excellent safety
let result = parse("Hello");
if (result instanceof InvalidDateFormatError) {
    console.log(error.messsage);
} else if (result instanceof DateIsInTheFutureError) {
    console.log(error.messsage);
} else {
    console.log("Date is", result.toISOString());
}

// Lazy way would be to avoid error handling individually and handle it explicitly

let result2 = parse("BYE");
if (result2 instanceof Error) {
    console.info(result2.message);
} else {
    console.info("Date is", result2.toISOString());
}

// The Option Type
// Instead of returning a value you return a container that may or may not have a value
// The container can be any type of data structure as long as it can hold the value

function parseOption(birthday: string): Date[] {
    let date = new Date(birthday);
    if (!date) {
        return [];
    } else {
        return [date];
    }
}

let date2 = parse("Hello");

// Downside is that the consumer does not know what error to handle
date2.map(_ => _.toISOString()).forEach(_ => console.info("Date is", _));
