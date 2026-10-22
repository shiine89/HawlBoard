export function createPriorityFilter(select, onChange) {
  let selectedPriority = "all";

  select.addEventListener("change", () => {
    selectedPriority = select.value;
    onChange();
  });

  return {
    apply(tasks) {
      // TODO: Qofka 1 ha hirgeliyo shaandhaynta mudnaanta.
      return tasks;
    },
    getSelectedPriority() {
      return selectedPriority;
    }
  };
}
