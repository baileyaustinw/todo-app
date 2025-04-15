import { updatedProjects } from "./models/projects";
import { tasks, addTask } from "./models/tasks";
import { addTaskListToDOM, generateTaskList } from "../views/tasklist";
import { setActiveProject } from "../views/sidebar";
import { projectContainer } from "..";

export function populateProjectSelect(el) {
    for (let i = 0; i < updatedProjects.length; i++) {
        let projectOption = document.createElement("option");
        projectOption.value = updatedProjects[i].id;
        projectOption.textContent = updatedProjects[i].title;

        el.appendChild(projectOption);
    }
}

export function taskFormEventListener(formModal, taskForm, taskContainer) {
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
    
        const formData = new FormData(taskForm);
        let title = formData.get("title");
        let dueDate = new Date(formData.get("dueDate"));
        let project = updatedProjects.find((el) => el.id == formData.get("project"));
        let priority = formData.get("priority");
        let description = formData.get("description");
    
        if (title && dueDate && project) {
            const newTask = addTask(title, dueDate, project, priority, description);
    
            taskForm.reset();
            if (formModal.style.display !== 'none') {
                formModal.close();
            }
        }

        let activeProject = document.querySelector('#p' + project.id).parentElement;
        setActiveProject(activeProject, projectContainer);

        let taskList = generateTaskList(project.id);
        addTaskListToDOM(taskList);
    });
}