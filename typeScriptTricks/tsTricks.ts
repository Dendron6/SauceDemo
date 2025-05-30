interface Task {
    description: string;
    status: string;
    created_by: string;
    id: number;
    est?: number;
}

// Original task
const originalTask: Task = {
    description: 'Original task',
    status: 'Draft',
    created_by: 'user1',
    id: 1
};

// Spread operator: create new object with modified description
const modifiedTask = {
    ...originalTask,    // spread all properties from originalTask
    description: 'Modified task'  // override description
};

// Rest parameters in object destructuring
const { description, ...restOfTask } = modifiedTask;// modifiedTask.description = 'Modified task' // but now you can access it as a constant
console.log('Description:', description);  // Just the description
console.log('Rest of task:', restOfTask); // Everything except description

// Spread operator with arrays
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5]; // [1, 2, 3, 4, 5]

// Rest parameters in function
function sum(first: number, ...rest: number[]) {
    return rest.reduce((acc, val) => acc + val, first);
}

console.log(sum(1, 2, 3, 4)); // 10

const thisTask : Task = {
    description: 'First task',
    status: 'Draft',
    created_by: 'anonymous',
    id: 1
}

thisTask.est = 10; // possible to later add a new property

const x = 'est' in thisTask; // possible to check if a property exists
console.log(x);

const unionType: string | number = 'Hello'; // can be a string or a number

type either = string | number; //alias for the union type

const y: either = 'Hello'; // instead of string | number we can use the type alias "either"

// Optional parameter
const functionWithOptionalParameter = (param?: string) => {
    if (param) {
        return param;
    }
    return 'No parameter';
}




