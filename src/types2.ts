// Refining types

type Unit = "cm" | "px" | "%";

let units: Unit[] = ["cm", "px", "%"];

function parseUnit(value: string): Unit | null {
    for (let i = 0; i < units.length; i++) {
        if (value.endsWith(units[i])) {
            return units[i];
        }
    }
    return null;
}

type Width = {
    unit: Unit;
    value: number;
};

function parseWidth(width: number | null | string | undefined): Width | null {
    // == operator here will check for both undefined and null at the same time
    // undefined == null is true
    // null == null is true as well
    // type is refined from number | null | string | undefined  to number | string
    if (width == null) {
        return null;
    }
    // if width is a number
    if (typeof width === "number") {
        return { unit: "px", value: width };
    }

    let unit = parseUnit(width);
    // if the parsedUnit is a truthy value otherwise it could be a null | number
    if (unit) {
        return { unit, value: parseFloat(width) };
    }
    // if width is a string then return null
    return null;
}

// Discriminated union types

type UserTextEvent = {
    type: "TextEvent";
    value: string;
    target: HTMLInputElement;
};
type UserMouseEvent = {
    type: "MouseEvent";
    value: [number, number];
    target: HTMLElement;
};

type UserEvent = UserMouseEvent | UserTextEvent;

function handleEvent(event: UserEvent) {
    if (event.type === "TextEvent") {
        // Members of a union might overlap
        // So event.target will return either the type UserTextEvent or UserEvent
        // To overcome this attach a literal type tag to each of the types
        event.value; // string
        event.target; // HTMLInputElement
        return;
    }
    event.value; // [number, number]
    event.target; // HTMLElement
}

type Weekday = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Day = Weekday | "Sat" | "Sun";

function getNextDay(day: Weekday): Day {
    switch (day) {
        case "Mon":
            return "Tue";
        case "Tue":
            return "Wed";
        case "Wed":
            return "Thu";
        case "Thu":
            return "Fri";
        case "Fri":
            return "Sat";
    }
}
