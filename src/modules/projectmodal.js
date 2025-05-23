import { addProject } from "./models/projects";
import { projectSelect } from "../index";
import { setActiveProject } from "../views/sidebar";

export function projectFormEventListener(formModal, projectForm, projectContainer) {
    projectForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(projectForm);
        let title = formData.get('title');
        let description = formData.get('description');
    
        if (title && description) {
            const newProj = addProject(title, description);
            addProjectToDOM(newProj, projectContainer);
            addProjectToSelect(newProj, projectSelect);
    
            projectForm.reset();
            formModal.close();
        }
    });
}

function addProjectToDOM(project, container) {
    let newProjectLi = document.createElement("li");
    let newProjectA = document.createElement("a");

    newProjectLi.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-folder" viewBox="0 0 16 16"><path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a2 2 0 0 1 .342-1.31zM2.19 4a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zm4.69-1.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139q.323-.119.684-.12h5.396z"/></svg>';

    newProjectA.id = "p" + project.id;
    newProjectA.href = "?project=" + project.id;
    newProjectA.textContent = project.title;

    container.appendChild(newProjectLi);
    newProjectLi.appendChild(newProjectA);

    newProjectLi.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveProject(newProjectLi, container);
    });
}

function addProjectToSelect(project, select) {
    let projectOption = document.createElement("option");
    projectOption.value = project.id;
    projectOption.textContent = project.title;

    select.appendChild(projectOption);
}