const projectList = document.querySelector("[data-lists]");
const projectForm = document.querySelector("[data-new-list-form]");
const projectFormInput = document.querySelector("[data-new-list-input]");
const deleteListButton = document.querySelector("[data-delete-list-button]");
const todosContainer = document.querySelector(".todos");
const todoTitle = document.querySelector("[data-list-tile]");
const todoTaskContainer = document.querySelector("[data-tasks]");
const todoForm = document.querySelector("[data-todo-form]");
const todoFormInput = document.querySelector("[data-todo-input]");
const deleteTasksButton = document.querySelector("[data-clear-completed-task]");

let lists = [];

let selectedProject;

const returnListObject = (name) => {
  return { id: Date.now().toString(), name: name, tasks: [] };
};

const returnTodoObject = (todo) => {
  return { id: Date.now().toString(), todo: todo, complete: false };
};

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = projectFormInput.value;
  projectFormInput.value = "";
  if (name === "") return;
  const project = returnListObject(name);
  lists.push(project);
  renderProjects();
});

const clearProjectList = () => {
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
};

const clearTodos = () => {
  while (todoTaskContainer.firstChild) {
    todoTaskContainer.removeChild(todoTaskContainer.firstChild);
  }
};

const renderProjects = () => {
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

const renderTodos = () => {
  const selectedTodoList = lists.find((list) => list.id === selectedProject);
  todoTitle.innerText = selectedTodoList.name;
  clearTodos();
  selectedTodoList.tasks.forEach((task) => {
    const div = document.createElement("div");
    div.classList.add("task");
    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.id = task.id;
    input.checked = task.complete;
    const label = document.createElement("label");
    label.classList.add("task-label");
    label.htmlFor = task.id;
    const span = document.createElement("span");
    label.appendChild(span);
    label.append(task.todo);
    div.appendChild(input);
    div.appendChild(label);
    todoTaskContainer.appendChild(div);
  });
};

projectList.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "li") {
    selectedProject = e.target.dataset.projectId;
    todosContainer.style.display = "";
    clearTodos();
    renderTodos();
    renderProjects();
  }
});

deleteListButton.addEventListener("click", (e) => {
  if (!selectedProject) alert("Please select a project");
  lists = lists.filter((list) => list.id !== selectedProject);
  selectedProject = null;
  renderProjects();
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoInput = todoFormInput.value;
  todoFormInput.value = "";
  if (todoInput === "") return;
  const todoObject = returnTodoObject(todoInput);
  const selectedTodoList = lists.find((list) => list.id === selectedProject);
  selectedTodoList.tasks.push(todoObject);
  renderTodos();
});

todoTaskContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "input") {
    const selectedTodoList = lists.find((list) => list.id === selectedProject);
    const task = selectedTodoList.tasks.find((task) => task.id === e.target.id);
    task.complete = !task.complete;
    renderTodos();
  }
});

deleteTasksButton.addEventListener("click", (e) => {
  const selectedTodoList = lists.find((list) => list.id === selectedProject);
  selectedTodoList.tasks = selectedTodoList.tasks.filter(
    (task) => !task.complete
  );
  renderTodos();
});

renderProjects();
