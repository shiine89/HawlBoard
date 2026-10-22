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
    store.addTask({
      title: values.title.trim(),
      assignee: values.assignee.trim(),
      description: values.description.trim(),
      priority: values.priority,
      dueDate: values.dueDate,
      status: "todo"
    });
    dialog.close();
    form.reset();
    onChange();
  });

  return {
    openForEdit() {
      // TODO: Qofka 2 ha ku daro habka wax-ka-beddelka.
    }
  };
}
