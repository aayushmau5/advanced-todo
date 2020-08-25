import { returnTodoObject } from "./returnObject";
import { clearTodos } from "./clearTasks";
import datas from "./list";

const todoForm = (function () {
  const todoTitle = document.querySelector("[data-list-tile]");
  const todoTaskContainer = document.querySelector("[data-tasks]");
  const todoForm = document.querySelector("[data-todo-form]");
  const todoFormInput = document.querySelector("[data-todo-input]");

  const renderTodos = () => {
    const selectedTodoList = datas.getLists.find(
      (list) => list.id === datas.getSelectedProject
    );
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

  const todoFormListener = () => {
    todoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const todoInput = todoFormInput.value;
      todoFormInput.value = "";
      if (todoInput === "") return;
      const todoObject = returnTodoObject(todoInput);
      const selectedTodoList = datas.getLists.find((list) => {
        if (list.id === datas.getSelectedProject) {
          return list;
        }
      });
      selectedTodoList.tasks.push(todoObject);
      renderTodos();
    });
  };

  const todoTaskListener = () => {
    todoTaskContainer.addEventListener("click", (e) => {
      if (e.target.tagName.toLowerCase() === "input") {
        const selectedTodoList = datas.getLists.find(
          (list) => list.id === datas.getSelectedProject
        );
        const task = selectedTodoList.tasks.find(
          (task) => task.id === e.target.id
        );
        task.complete = !task.complete;
        renderTodos();
      }
    });
  };

  return { renderTodos, todoFormListener, todoTaskListener };
})();

export default todoForm;
