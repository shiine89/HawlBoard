export function mountTaskForm({ openButton, closeButton, cancelButton, dialog, form, store, onChange }) {
  openButton.addEventListener("click", () => {
    form.reset();
    dialog.showModal();
    document.getElementById("task-title").focus();
  });

  closeButton.addEventListener("click", () => dialog.close());
  cancelButton.addEventListener("click", () => dialog.close());

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    const taskId = form.dataset.editingTaskId;

    if (taskId) {
      // Update existing task
      store.updateTask(taskId, {
        title: values.title.trim(),
        assignee: values.assignee.trim(),
        description: values.description.trim(),
        priority: values.priority,
        dueDate: values.dueDate,
      });
    } else {
      // Add new task
      store.addTask({
        title: values.title.trim(),
        assignee: values.assignee.trim(),
        description: values.description.trim(),
        priority: values.priority,
        dueDate: values.dueDate,
        status: "todo"
      });
    }

    dialog.close();
    form.reset();
    delete form.dataset.editingTaskId;
    onChange();
  });

  return {
    openForEdit(task) {
      // 1. Populate the form with existing task data
      const inputs = form.elements;
      if (inputs.title) inputs.title.value = task.title;
      if (inputs.assignee) inputs.assignee.value = task.assignee;
      if (inputs.description) inputs.description.value = task.description || "";
      if (inputs.priority) inputs.priority.value = task.priority;
      if (inputs.dueDate) inputs.dueDate.value = task.dueDate || "";

      // 2. Store the task ID on the form to differentiate between "Add" and "Update"
      form.dataset.editingTaskId = task.id;

      dialog.showModal();
      if (inputs.title) inputs.title.focus();
    }
  };
}
