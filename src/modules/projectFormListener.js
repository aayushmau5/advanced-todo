import { returnListObject } from "./returnObject";
import { clearProjectList } from "./clearTasks";
import datas from "./list";

const projectForm = (function () {
  const projectForm = document.querySelector("[data-new-list-form]");
  const projectFormInput = document.querySelector("[data-new-list-input]");
  const projectList = document.querySelector("[data-lists]");
  const todosContainer = document.querySelector(".todos");

  const renderProjects = () => {
    clearProjectList();
    datas.getLists.forEach((list) => {
      const li = document.createElement("li");
      li.classList.add("list");
      li.innerText = list.name;
      li.dataset.projectId = list.id;
      if (li.dataset.projectId === datas.getSelectedProject)
        li.classList.add("active");
      projectList.appendChild(li);
    });
    if (!datas.getSelectedProject) todosContainer.style.display = "none";
  };

  const addProjectListener = () => {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = projectFormInput.value;
      projectFormInput.value = "";
      if (name === "") return;
      const project = returnListObject(name);
      datas.addToLists = project;
      renderProjects();
    });
  };

  return { addProjectListener, renderProjects };
})();

export default projectForm;
