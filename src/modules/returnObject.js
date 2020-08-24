const returnListObject = (name) => {
  return { id: Date.now().toString(), name: name, tasks: [] };
};

const returnTodoObject = (todo) => {
  return { id: Date.now().toString(), todo: todo, complete: false };
};

export { returnListObject, returnTodoObject };
