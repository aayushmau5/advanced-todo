import { clearTodos } from "./modules/clearTasks";
import projectForm from "./modules/projectFormListener";
import todoForm from "./modules/todosListener";
import datas from "./modules/list";

const projectList = document.querySelector("[data-lists]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const todosContainer = document.querySelector(".todos");
const deleteTasksButton = document.querySelector("[data-clear-completed-task]");

projectForm.addProjectListener();
todoForm.todoFormListener();
todoForm.todoTaskListener();

// datas.setLists = 1;
// datas.setLists = 2;
// datas.setSelectedProject = "sherlock";
// console.log(datas.getLists);
// console.log(datas.getSelectedProject);

projectList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    datas.setSelectedProject = e.target.dataset.projectId;
    todosContainer.style.display = "";
    clearTodos();
    todoForm.renderTodos();
    projectForm.renderProjects();
  }
});

deleteTasksButton.addEventListener("click", (e) => {
  const selectedTodoList = datas.getLists.find(
    (list) => list.id === datas.getSelectedProject
  );
  selectedTodoList.tasks = selectedTodoList.tasks.filter(
    (task) => !task.complete
  );
  todoForm.renderTodos();
});

deleteListButton.addEventListener("click", (e) => {
  if (!datas.getSelectedProject) alert("Please select a project");
  datas.setLists = datas.getLists.filter(
    (list) => list.id !== datas.getSelectedProject
  );
  datas.setSelectedProject = null;
  projectForm.renderProjects();
});

projectForm.renderProjects();
