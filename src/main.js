import { demoTasks } from "./data.js";
import { createTaskStore } from "./store.js";
import { renderDashboard } from "./render.js";
import { createSearchFilter } from "./features/search-filter.js";
import { createPriorityFilter } from "./features/priority-filter.js";
import { mountTaskForm } from "./features/task-form.js";
import { mountTaskActions } from "./features/task-actions.js";
import { mountDragAndDrop } from "./features/drag-drop.js";
import { createLocalStorageAdapter } from "./features/local-storage.js";

const store = createTaskStore(demoTasks, createLocalStorageAdapter());
const board = document.getElementById("board");

function refreshBoard() {
  const allTasks = store.getAll();
  const visibleTasks = priorityFilter.apply(searchFilter.apply(allTasks));
  renderDashboard(visibleTasks, allTasks);
}

const searchFilter = createSearchFilter(document.getElementById("search-input"), refreshBoard);
const priorityFilter = createPriorityFilter(document.getElementById("priority-filter"), refreshBoard);

const taskForm = mountTaskForm({
  openButton: document.getElementById("new-task-button"),
  closeButton: document.getElementById("close-dialog"),
  cancelButton: document.getElementById("cancel-dialog"),
  dialog: document.getElementById("task-dialog"),
  form: document.getElementById("task-form"),
  store,
  onChange: refreshBoard
});

mountTaskActions({
  board,
  store,
  onChange: refreshBoard,
  onEdit: taskForm.openForEdit
});

mountDragAndDrop({ board, store, onChange: refreshBoard });
refreshBoard();
