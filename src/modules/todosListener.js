import { returnTodoObject } from "./returnObject";
import { clearTodos } from "./clearTasks";

const todoForm = (function () {
  const todoTitle = document.querySelector("[data-list-tile]");
  const todoTaskContainer = document.querySelector("[data-tasks]");
  const todoForm = document.querySelector("[data-todo-form]");
  const todoFormInput = document.querySelector("[data-todo-input]");

  const renderTodos = (lists, selectedProject) => {
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

  const todoFormListener = (lists, selectedProject) => {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoInput = todoFormInput.value;
      todoFormInput.value = "";
      if (todoInput === "") return;
      const todoObject = returnTodoObject(todoInput);
      const selectedTodoList = lists.find(
        (list) => list.id === selectedProject
      );
      selectedTodoList.tasks.push(todoObject);
      renderTodos(lists, selectedProject);
    });
  };

  const todoTaskListener = (lists, selectedProject) => {
    todoTaskContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "input") {
        const selectedTodoList = lists.find(
          (list) => list.id === selectedProject
        );
        const task = selectedTodoList.tasks.find(
          (task) => task.id === e.target.id
        );
        task.complete = !task.complete;
        renderTodos(lists, selectedProject);
      }
    });
  };

  return { renderTodos, todoFormListener, todoTaskListener };
})();

export default todoForm;
