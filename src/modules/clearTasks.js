const clearProjectList = () => {
  const projectList = document.querySelector("[data-lists]");
  while (projectList.firstChild) {
    projectList.removeChild(projectList.firstChild);
  }
};

const clearTodos = () => {
  const todoTaskContainer = document.querySelector("[data-tasks]");
  while (todoTaskContainer.firstChild) {
    todoTaskContainer.removeChild(todoTaskContainer.firstChild);
  }
};

export { clearProjectList, clearTodos };
