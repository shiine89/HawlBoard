export function createTaskStore(initialTasks, adapter = null) {
  const loadedTasks = adapter && typeof adapter.load === "function" ? adapter.load() : null;
  let tasks = Array.isArray(loadedTasks) ? loadedTasks : initialTasks.map((task) => ({ ...task }));

  function save() {
    if (adapter && typeof adapter.save === "function") adapter.save(tasks);
  }

  function getAll() {
    return tasks.map((task) => ({ ...task }));
  }

  function addTask(values) {
    const task = {
      ...values,
      id: crypto.randomUUID(),
      status: values.status || "todo"
    };
    tasks = [task, ...tasks];
    save();
    return { ...task };
  }

  function updateTask(id, values) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index < 0) return null;
    tasks[index] = { ...tasks[index], ...values, id };
    save();
    return { ...tasks[index] };
  }

  function deleteTask(id) {
    const oldLength = tasks.length;
    tasks = tasks.filter((task) => task.id !== id);
    if (tasks.length !== oldLength) save();
    return tasks.length !== oldLength;
  }

  function setTaskStatus(id, status) {
    return updateTask(id, { status });
  }

  return { getAll, addTask, updateTask, deleteTask, setTaskStatus };
}
