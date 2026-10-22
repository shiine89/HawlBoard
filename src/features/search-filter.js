export function createSearchFilter(input, onChange) {
  let query = "";

  input.addEventListener("input", () => {
    query = input.value.trim().toLocaleLowerCase();
    onChange();
  });

  return {
    apply(tasks) {
      if (!query) return tasks;
      return tasks.filter((task) =>
        String(task.title || "").toLocaleLowerCase().includes(query)
      );
    }
  };
}
