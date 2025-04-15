import { updatedTasks, removeTask } from "./tasks";

export const projects = getProjects();
export let updatedProjects = [];
for (let i = 0; i < projects.length; i++) {
    updatedProjects.push(projects[i]);
}

export class Project {
    title;
    description;
    id;

    constructor(title, description) {
        this.title = title;
        this.description = description;
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

    set title(val) {
        this.title = val;
    }

    get title() {
        return this.title;
    }

    set description(val) {
        this.description = val;
    }

    get description() {
        return this.description;
    }

    get id() {
        return this.id;
    }
}

function getProjects() {
    let projects;

    if (localStorage.getItem("projects")) {
        projects = JSON.parse(localStorage.getItem("projects"));
    } else {
        projects = [];
    }

    return projects;
}

export function addProject(title, description) {
    let project = new Project(title, description);

    updatedProjects.push(project);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));

    console.log(updatedProjects);
    return project;
}

export function removeProject(id) {
    let project = updatedProjects.find((item) => item.id == id);
    let tasks = updatedTasks.filter((item) => item.project.id == id);

    if (tasks && tasks.length > 0 ) {
        for (let i = 0; i < tasks.length; i++) {
            console.log(tasks[i].id);
            removeTask(tasks[i].id);
        }
    }

    updatedProjects.splice(updatedProjects.indexOf(project), 1);
    localStorage.setItem("projects", JSON.stringify(updatedProjects));
}