export function mountTaskActions({ board, store, onChange, onEdit }) {
  board.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (!button) return;

    const taskId = button.dataset.taskId;
    const action = button.dataset.action;
    const task = store.getAll().find((item) => item.id === taskId);
    if (!task) return;

    if (action === "edit") {
      onEdit(task);
      return;
    }

    if (action === "delete" && window.confirm('Ma tirtiraysaa hawsha "' + task.title + '"?')) {
      store.deleteTask(taskId);
      onChange();
    }
  });
}
