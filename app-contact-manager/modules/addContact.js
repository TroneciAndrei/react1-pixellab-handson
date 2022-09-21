export const render = () => {
  const container = document.createElement('form');
  container.classList.add('add-contact');

  container.innerHTML = `
    <h4>Add new contact</h4>
    <label class="form-label mt-2">Name</label>
    <input type="text"
      name="name"
      class="form-control form-control-sm"
    >
    <label class="form-label mt-2">Surname</label>
    <input type="text"
      name="surname"
      class="form-control form-control-sm"
    >
    <label class="form-label mt-2">Phone</label>
    <input type="tel"
      name="phone"
      class="form-control form-control-sm"
    >
    <label class="form-label mt-2">Email</label>
    <input type="email"
      name="email"
      class="form-control form-control-sm"
    >
    <div class="mt-2">
      <button type="submit"
        title="Save"
        class="btn btn-secondary me-1"
      >Save</button>
      <button type="button"
        title="Cancel"
        class="btn btn-secondary cancel-button"
      >Cancel</button>
    </div>
  `;

  return container;
};
