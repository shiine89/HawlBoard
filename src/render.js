const statusOptions = [
  ["todo", "La sugayo"],
  ["in-progress", "Socda"],
  ["done", "Dhammaystiran"]
];

const priorityLabels = {
  high: "Degdeg",
  medium: "Caadi",
  low: "Hoose"
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function initials(name) {
  return String(name || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "")
    .join("")
    .toUpperCase();
}

function formatDate(value) {
  if (!value) return "Taariikh ma leh";
  const date = new Date(value + "T00:00:00");
  if (Number.isNaN(date.getTime())) return "Taariikh ma leh";
  return new Intl.DateTimeFormat("so", { day: "numeric", month: "short" }).format(date);
}

function renderTask(task) {
  const priority = priorityLabels[task.priority] ? task.priority : "medium";
  return [
    '<article class="task-card" draggable="true" data-task-id="', escapeHtml(task.id), '">',
      '<div class="task-card-top">',
        '<span class="priority priority-', priority, '">', priorityLabels[priority], '</span>',
      '</div>',
      '<h3>', escapeHtml(task.title), '</h3>',
      '<p class="task-description">', escapeHtml(task.description || "Faahfaahin lama darin."), '</p>',
      '<div class="task-meta">',
        '<span class="assignee"><span class="avatar" aria-hidden="true">', escapeHtml(initials(task.assignee)), '</span>',
          '<span>', escapeHtml(task.assignee || "Qof looma qoondeyn"), '</span></span>',
        '<span class="due-date">', escapeHtml(formatDate(task.dueDate)), '</span>',
      '</div>',
      '<div class="task-actions">',
        '<button class="task-action" type="button" data-action="edit" data-task-id="', escapeHtml(task.id), '">Wax ka beddel</button>',
        '<button class="task-action" type="button" data-action="delete" data-task-id="', escapeHtml(task.id), '">Tirtir</button>',
      '</div>',
    '</article>'
  ].join("");
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = String(value);
}

export function renderDashboard(visibleTasks, allTasks) {
  for (const [status] of statusOptions) {
    const list = document.querySelector('[data-dropzone="' + status + '"]');
    const count = document.querySelector('[data-column-count="' + status + '"]');
    const matching = visibleTasks.filter((task) => task.status === status);
    if (list) {
      list.innerHTML = matching.length
        ? matching.map(renderTask).join("")
        : '<p class="empty-state">Halkan hawl kuma jirto.</p>';
    }
    if (count) count.textContent = String(matching.length);
  }

  setText("stat-total", allTasks.length);
  setText("stat-todo", allTasks.filter((task) => task.status === "todo").length);
  setText("stat-progress", allTasks.filter((task) => task.status === "in-progress").length);
  setText("stat-done", allTasks.filter((task) => task.status === "done").length);
  setText("results-label", visibleTasks.length + " hawlood ayaa muuqda");
}
