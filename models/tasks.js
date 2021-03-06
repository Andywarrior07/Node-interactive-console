const Task = require('./task');

class Tasks {
  get allTasks() {
    const tasks = [];

    Object.keys(this._tasks).forEach(key => {
      const task = this._tasks[key];
      tasks.push(task);
    });

    return tasks;
  }

  constructor() {
    this._tasks = {};
  }

  createTask(description) {
    const task = new Task(description);

    this._tasks[task.id] = task;
  }

  loadTasks(tasks = []) {
    tasks.forEach(task => {
      this._tasks[task.id] = task;
    });
  }

  getAllTasks() {
    console.log();
    this.allTasks.forEach((task, index) => {
      const { description, completedAt } = task;
      const number = `${index + 1}`.green;
      const status = completedAt ? 'Completada'.green : 'Pendiente'.red;
      console.log(`${number}. ${description} :: ${status}`);
    });
  }

  getAllTasksByStatus(completed = true) {
    console.log();
    let index = 0;
    this.allTasks.forEach(task => {
      const { description, completedAt } = task;

      if (!!completedAt !== completed) {
        return;
      }

      index += 1;
      const number = `${index}`.green;
      const status = completed ? completedAt.green : 'Pendiente'.red;
      console.log(`${number}. ${description} :: ${status}`);
    });
  }

  deleteTask(id) {
    if (!this._tasks[id]) {
      return;
    }

    delete this._tasks[id];
  }

  updateTask(ids) {
    ids.forEach(id => {
      const task = this._tasks[id];

      if (task.completedAt) {
        return;
      }

      task.completedAt = new Date().toISOString();
    });

    this.allTasks.forEach(task => {
      if (ids.includes(task.id)) {
        return;
      }

      this._tasks[task.id].completedAt = null;
    });
  }
}

module.exports = Tasks;
