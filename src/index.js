import './styles.css';
import { populateProjectsList, setActiveProject, showAllTasksHandler } from './views/sidebar.js';
import { projectFormEventListener } from './modules/projectmodal.js';
import { populateProjectSelect } from './modules/taskmodal.js';
import { taskFormEventListener } from './modules/taskmodal.js';
import { showAllTasks } from './views/tasklist.js';

export const projectSelect = document.querySelector("#project");

export let projectContainer = document.querySelector(".project-list");
let taskContainer = document.querySelector(".task-list");
let addProjectButton = document.querySelector("#add-project");
let addProjectModal = document.querySelector("#addProjectModal");
let closeProjectModalButton = document.querySelector("#closeProjectModal");
let addTaskButton = document.querySelector("#add-task");
let addTaskModal = document.querySelector("#addTaskModal");
let closeTaskModalButton = document.querySelector("#closeTaskModal");
let addProjectForm = document.querySelector("#addProjectForm");
let addTaskForm = document.querySelector("#addTaskForm");
let showAllTasksButton = document.querySelector("#allTasks");

addProjectButton.addEventListener("click", function(e) {
    addProjectModal.showModal();
});

addTaskButton.addEventListener("click", () => {
    addTaskModal.showModal();
});

closeProjectModalButton.addEventListener("click", function(e) {
    addProjectModal.close();
});

closeTaskModalButton.addEventListener("click", () => {
    addTaskModal.close();
});

populateProjectSelect(projectSelect);
populateProjectsList(projectContainer);

projectFormEventListener(addProjectModal, addProjectForm, projectContainer);
taskFormEventListener(addTaskModal, addTaskForm, taskContainer);

showAllTasks();
showAllTasksHandler(showAllTasksButton, projectContainer);
setActiveProject(showAllTasksButton.parentElement, projectContainer);