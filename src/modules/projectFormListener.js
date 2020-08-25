import { returnListObject } from "./returnObject";
import { clearProjectList } from "./clearTasks";

const projectForm = (function () {
  const projectForm = document.querySelector("[data-new-list-form]");
  const projectFormInput = document.querySelector("[data-new-list-input]");
  const projectList = document.querySelector("[data-lists]");
  const todosContainer = document.querySelector(".todos");

  const renderProjects = (lists, selectedProject) => {
    clearProjectList();
    lists.forEach((list) => {
      const li = document.createElement("li");
      li.classList.add("list");
      li.innerText = list.name;
      li.dataset.projectId = list.id;
      if (li.dataset.projectId === selectedProject) li.classList.add("active");
      projectList.appendChild(li);
    });
    if (!selectedProject) todosContainer.style.display = "none";
  };

  const addProjectListener = (lists, selectedProject) => {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = projectFormInput.value;
      projectFormInput.value = "";
      if (name === "") return;
      const project = returnListObject(name);
      lists.push(project);
      renderProjects(lists, selectedProject);
    });
  };

  return { addProjectListener, renderProjects };
})();

export default projectForm;
