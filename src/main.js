import { clearTodos } from "./modules/clearTasks";
import projectForm from "./modules/projectFormListener";
import todoForm from "./modules/todosListener";

const projectList = document.querySelector("[data-lists]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const todosContainer = document.querySelector(".todos");
const deleteTasksButton = document.querySelector("[data-clear-completed-task]");

let lists = [];
let selectedProject;

const getLists = () => lists;
const getSelectedProject = () => selectedProject;

projectForm.addProjectListener(getLists(), getSelectedProject());
todoForm.todoFormListener(getLists(), getSelectedProject());
todoForm.todoTaskListener(getLists(), getSelectedProject());

projectList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedProject = e.target.dataset.projectId;
    todosContainer.style.display = "";
    clearTodos();
    todoForm.renderTodos(getLists(), getSelectedProject());
    projectForm.renderProjects(getLists(), getSelectedProject());
  }
});

deleteTasksButton.addEventListener("click", (e) => {
  const selectedTodoList = lists.find((list) => list.id === selectedProject);
  selectedTodoList.tasks = selectedTodoList.tasks.filter(
    (task) => !task.complete
  );
  todoForm.renderTodos(getLists(), getSelectedProject());
});

deleteListButton.addEventListener("click", (e) => {
  if (!selectedProject) alert("Please select a project");
  lists = lists.filter((list) => list.id !== selectedProject);
  selectedProject = null;
  projectForm.renderProjects(getLists(), getSelectedProject());
});

projectForm.renderProjects(getLists(), getSelectedProject());
