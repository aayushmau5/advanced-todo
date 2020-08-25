const datas = {
  lists: [],
  selectedProject: null,
  get getLists() {
    return this.lists;
  },
  get getSelectedProject() {
    return this.selectedProject;
  },
  set setLists(value) {
    this.lists = value;
  },
  set setSelectedProject(value) {
    this.selectedProject = value;
  },
  set addToLists(value) {
    this.lists.push(value);
  },
};

export default datas;
