export function mountTaskForm({ openButton, closeButton, cancelButton, dialog, form, store, onChange }) {
  const titleInput = form.elements.namedItem("title");
  const assigneeInput = form.elements.namedItem("assignee");
  const errorMessage = form.querySelector(".form-error");
  const requiredFields = [
    { input: titleInput, label: "Cinwaanka" },
    { input: assigneeInput, label: "Qofka qabanaya" }
  ];

  form.noValidate = true;

  function clearValidation() {
    for (const { input } of requiredFields) {
      input.removeAttribute("aria-invalid");
      input.removeAttribute("aria-describedby");
    }
    if (errorMessage) {
      errorMessage.textContent = "";
      errorMessage.hidden = true;
    }
  }

  function validateRequiredFields() {
    let firstInvalidField = null;

    for (const field of requiredFields) {
      const isInvalid = !field.input.value.trim();
      if (isInvalid) {
        firstInvalidField ??= field;
        field.input.setAttribute("aria-invalid", "true");
        if (errorMessage?.id) field.input.setAttribute("aria-describedby", errorMessage.id);
      } else {
        field.input.removeAttribute("aria-invalid");
        field.input.removeAttribute("aria-describedby");
      }
    }

    if (!firstInvalidField) {
      if (errorMessage) {
        errorMessage.textContent = "";
        errorMessage.hidden = true;
      }
      return true;
    }

    if (errorMessage) {
      errorMessage.textContent = firstInvalidField.label === "Cinwaanka"
        ? "Cinwaanka hawsha waa khasab. Fadlan geli cinwaanka."
        : "Qofka qabanaya waa khasab. Fadlan geli magaca qofka.";
      errorMessage.hidden = false;
    }
    return false;
  }

  openButton.addEventListener("click", () => {
    form.reset();
    clearValidation();
    dialog.showModal();
    titleInput.focus();
  });

  closeButton.addEventListener("click", () => {
    clearValidation();
    dialog.close();
  });
  cancelButton.addEventListener("click", () => {
    clearValidation();
    dialog.close();
  });

  for (const { input } of requiredFields) {
    input.addEventListener("input", () => {
      if (errorMessage && !errorMessage.hidden) validateRequiredFields();
    });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validateRequiredFields()) {
      requiredFields.find(({ input }) => !input.value.trim())?.input.focus();
      return;
    }

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
    clearValidation();
    delete form.dataset.editingTaskId;
    onChange();
  });

  return {
    openForEdit(task) {
      const inputs = form.elements;
      if (inputs.title) inputs.title.value = task.title;
      if (inputs.assignee) inputs.assignee.value = task.assignee;
      if (inputs.description) inputs.description.value = task.description || "";
      if (inputs.priority) inputs.priority.value = task.priority;
      if (inputs.dueDate) inputs.dueDate.value = task.dueDate || "";

      form.dataset.editingTaskId = task.id;
      dialog.showModal();
      if (inputs.title) inputs.title.focus();
    }
  };
}
