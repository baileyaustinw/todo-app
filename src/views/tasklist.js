import { projectContainer } from "..";
import { updatedTasks, removeTask } from "../modules/models/tasks";
import { setActiveProject } from "./sidebar";

export function showAllTasks() {
    addTaskListToDOM(updatedTasks);
}

export function generateTaskList(projectId) {
    const taskList = updatedTasks.filter((task) => task.project.id == projectId);

    return taskList;
}

export function addTaskListToDOM(taskList) {
    let container = document.querySelector(".task-list");
    container.querySelectorAll('*').forEach(n => n.remove());

    if (taskList.length == 0) {
        let emptyTask = document.createElement("p");
        emptyTask.textContent = "No tasks have been added to this project yet";

        container.appendChild(emptyTask);
    } else {
        for (let i = 0; i < taskList.length; i++) {
            let newTaskContainer = document.createElement("div");
            newTaskContainer.classList.add('task-container');
            newTaskContainer.id = "t" + taskList[i].id;
            newTaskContainer.setAttribute('data-project', taskList[i].project.id);
    
            let taskPriorityDueDateContainer = document.createElement("div");
            taskPriorityDueDateContainer.classList.add("task-priority-container");
    
            let taskProject = document.createElement("p");
            taskProject.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>';
            taskProject.innerHTML += taskList[i].project.title;
    
            taskPriorityDueDateContainer.appendChild(taskProject);
    
            if (taskList[i].priority) {
                let taskPriority = document.createElement("p");
                taskPriority.classList.add("task-priority");
                taskPriority.textContent = taskList[i].priority + " Priority";
    
                switch (taskList[i].priority) {
                    case 'High':
                        taskPriority.classList.add('high-priority');
                        break;
                    case 'Medium':
                        taskPriority.classList.add('med-priority');
                        break;
                    case 'Low':
                        taskPriority.classList.add('low-priority');
                        break;
                }
    
                taskPriorityDueDateContainer.appendChild(taskPriority);
                newTaskContainer.appendChild(taskPriorityDueDateContainer);
            }
    
            if (taskList[i].dueDate) {
                let taskDate = new Date(taskList[i].dueDate);
                let taskDueDate = document.createElement("p");
                taskDueDate.classList.add("task-due-date");
                taskDueDate.textContent = `Due ${taskDate.getMonth()}/${taskDate.getDate()}/${taskDate.getFullYear()}`;
    
                taskPriorityDueDateContainer.appendChild(taskDueDate);
            }
    
            let taskDeleteButton = document.createElement("button");
            taskDeleteButton.id = "deleteTask";
            taskDeleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';
            taskPriorityDueDateContainer.appendChild(taskDeleteButton);
    
            addDeleteEventListener(taskDeleteButton);
    
            let taskHeaderDiv = document.createElement("div");
            taskHeaderDiv.classList.add("task-header");
    
            let taskCheckMark = document.createElement("input");
            taskCheckMark.type = 'checkbox';
            taskCheckMark.id = 'taskCompleted';
    
            toggleChecked(taskCheckMark, newTaskContainer);
    
            let taskTitle = document.createElement("h1");
            taskTitle.textContent = taskList[i].title;
    
            taskHeaderDiv.appendChild(taskCheckMark);
            taskHeaderDiv.appendChild(taskTitle);
            newTaskContainer.appendChild(taskHeaderDiv);
            container.appendChild(newTaskContainer);
    
            if (taskList[i].description) {
                let taskDescription = document.createElement("p");
                taskDescription.textContent = taskList[i].description;
                taskDescription.classList.add("task-description");
    
                newTaskContainer.appendChild(taskDescription);
            }
        }
    }
}

function toggleChecked(el, container) {
    el.addEventListener("click", (e) => {
        if (el.checked == true) {
            container.classList.add('checked');
        } else {
            container.classList.remove('checked');
        }
    })
}

function addDeleteEventListener(el) {
    el.addEventListener("click", (e) => {
        e.preventDefault();
        let taskId = el.parentElement.parentElement.id.slice(1);
        let projectId = el.parentElement.parentElement.getAttribute('data-project');

        removeTask(taskId);
        refreshTaskList(projectId);
    });
}

export function refreshTaskList(projectId) {
    let taskList = generateTaskList(projectId);
    let target = "#p" + projectId;
    let el = document.querySelector(target).parentElement;
    
    setActiveProject(el, projectContainer);
    addTaskListToDOM(taskList);
}