export function mountTaskForm({ openButton, closeButton, cancelButton, dialog, form, store, onChange }) {
  const titleInput = form.elements.namedItem("title");
  const assigneeInput = form.elements.namedItem("assignee");
  const errorMessage = form.querySelector(".form-error");
  const requiredFields = [
    { input: titleInput, label: "Cinwaanka" },
    { input: assigneeInput, label: "Qofka qabanaya" }
  ];

  // We validate trimmed values below so whitespace alone cannot pass as input.
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
    store.addTask({
      title: titleInput.value.trim(),
      assignee: assigneeInput.value.trim(),
      description: (values.description || "").trim(),
      priority: values.priority,
      dueDate: values.dueDate,
      status: "todo"
    });
    form.reset();
    clearValidation();
    dialog.close();
    onChange();
  });

  return {
    openForEdit() {
      // TODO: Qofka 2 ha ku daro habka wax-ka-beddelka.
    }
  };
}
