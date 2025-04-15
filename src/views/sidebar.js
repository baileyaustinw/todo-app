import { projects, removeProject } from "../modules/models/projects";
import { generateTaskList, addTaskListToDOM, showAllTasks, refreshTaskList } from "./tasklist";
import { projectContainer, projectSelect } from "..";
import { populateProjectSelect } from "../modules/taskmodal";

export function showAllTasksHandler(el, projectNavContainer) {
    el.addEventListener("click", (e) => {
        e.preventDefault();

        setActiveProject(el.parentElement, projectNavContainer);
        showAllTasks();
    });
}

export function populateProjectsList(container) {
    let count = 0;

    for (let i = 0; i < projects.length; i++) {
        let newProjectLi = document.createElement("li");
        let newProjectA = document.createElement("a");

        newProjectLi.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>';

        newProjectA.id = "p" + projects[i].id;
        newProjectA.href = "?project=" + projects[i].id;
        newProjectA.textContent = projects[i].title;

        container.appendChild(newProjectLi);
        newProjectLi.appendChild(newProjectA);

        newProjectLi.addEventListener("click", (e) => {
            e.preventDefault();
            setActiveProject(newProjectLi, container);

            let taskList = generateTaskList(newProjectLi.lastChild.id.slice(1));
            addTaskListToDOM(taskList);
        });

        count++;
    }
}

function removeProjectFromList(projectId) {
    let projectItem = document.querySelector("#p" + projectId).parentElement;
    projectContainer.removeChild(projectItem);

    let projectSelect = document.querySelector('#project');
    for (let i = 0; i < projectSelect.children.length; i++) {
        if (projectSelect.children[i].value == projectId) {
            projectSelect.removeChild(projectSelect.children[i]);
        }
    }
}

export function setActiveProject(el, projectNavContainer) {
    const listItems = projectNavContainer.getElementsByTagName("li");
    for (let i = 0; i < listItems.length; i++) {
        const listItem = listItems[i];
        listItem.classList.remove("active");
    }

    let projectTitle = document.querySelector("#projectTitle");
    projectTitle.textContent = el.textContent;

    if (el.children[1].id !== "allTasks") {
        let deleteProjectButton = document.createElement("button");
        deleteProjectButton.id = "deleteProject";
        deleteProjectButton.setAttribute('data-project', el.children[1].id);
        deleteProjectButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/></svg>';
        projectTitle.appendChild(deleteProjectButton);

        deleteProjectButton.addEventListener("click", (e) => {
            e.preventDefault();
            let projectId = deleteProjectButton.getAttribute('data-project').slice(1);
            removeProject(projectId);

            let el = document.querySelector("#allTasks").parentElement;
            removeProjectFromList(projectId);
            setActiveProject(el, projectContainer);
        });
    }

    el.classList.add("active");
}