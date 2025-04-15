export const tasks = getTasks();

export let updatedTasks = [];
for (let i = 0; i < tasks.length; i++) {
    updatedTasks.push(tasks[i]);
}

export class Task {
    id;
    project;
    title;
    description;
    dueDate;
    priority;
    notes;
    completed;

    constructor(title, dueDate, project) {
        this.title = title;
        this.dueDate = dueDate;
        this.project = project;
        this.id = this.generateId();
    }

    generateId() {
        let nums = "0123456789";
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += nums.charAt(Math.floor(Math.random() * 10));
        }

        return result;
    }

    get project() {
        return `${this.project}`;
    }

    set project(val) {
        this.project = val;
    }

    get title() {
        return `${this.title}`;
    }

    set title(val) {
        this.title = val;
    }

    get dueDate() {
        return `${this.dueDate}`;
    }

    set dueDate(val) {
        this.dueDate = val;
    }

    get description() {
        return `${this.description}`;
    }

    set description(val) {
        this.description = val;
    }

    get priority() {
        return `${this.priority}`;
    }

    set priority(val) {
        this.priority = val;
    }

    get notes() {
        return `${this.notes}`;
    }

    set notes(val) {
        this.notes = val;
    }

    set completed(val) {
        this.completed = val;
    }
}

function getTasks() {
    let tasks;

    if (localStorage.getItem("tasks")) {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    } else {
        tasks = [];
    }

    return tasks;
}

export function addTask(title, dueDate, project, priority, description) {
    const task = new Task(title, dueDate, project);

    if (priority) task.priority = priority;
    if (description) task.description = description;

    updatedTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));

    return task;
}

export function removeTask(id) {
    let task = updatedTasks.find((item) => item.id == id);
    console.log(task);

    updatedTasks.splice(updatedTasks.indexOf(task), 1);
    console.log(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}