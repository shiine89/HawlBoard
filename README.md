# HawlBoard

HawlBoard is a small Kanban-style task board built as a GitHub collaboration practice project for a team of three. It is designed to be approachable while still giving contributors real features to build, review, and merge through pull requests.

## Project overview

The board groups tasks into three columns: **To Do**, **In Progress**, and **Done**. Each card can show a title, description, assignee, priority, and due date.

The starter currently includes:

- A responsive board layout for desktop and mobile screens
- Six sample tasks across the three board columns
- Summary counts for all tasks and each status
- A form for adding tasks
- Task deletion with a confirmation prompt
- Search by task title
- A small in-memory task store with add, update, delete, and status-change methods

The following features are intentionally left as team exercises: searching by assignee, priority filtering, custom form validation, editing existing tasks, drag-and-drop status changes, and saving tasks in browser storage.

## Built with

- HTML
- CSS
- Vanilla JavaScript using ES modules

There are no package dependencies or build step.

## Run locally

JavaScript modules should be served from a local web server. Do not open `index.html` directly from the file system.

1. Clone the repository and enter the project folder:

   ```bash
   git clone https://github.com/USERNAME/REPOSITORY.git
   cd REPOSITORY
   ```

2. Start a local server. On Windows, use:

   ```bash
   py -m http.server 5500
   ```

   If `py` is unavailable, use `python -m http.server 5500`.

3. Open [http://localhost:5500](http://localhost:5500) in your browser.

You can also use the VS Code Live Server extension to serve `index.html`.

## Project structure

```text
hawlboard-starter/
├── index.html
├── styles.css
├── TEAM_TASKS.md
└── src/
    ├── data.js
    ├── main.js
    ├── render.js
    ├── store.js
    └── features/
        ├── drag-drop.js
        ├── local-storage.js
        ├── priority-filter.js
        ├── search-filter.js
        ├── task-actions.js
        └── task-form.js
```

## Team tasks

Each person owns two features. Full requirements and acceptance criteria are in [`TEAM_TASKS.md`](./TEAM_TASKS.md).
