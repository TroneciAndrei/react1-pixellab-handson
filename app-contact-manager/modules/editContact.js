export const render = (contact) => {
  const { name, surname, email, phone, id } = contact;
  const container = document.createElement('form');
  container.classList.add('edit-contact');

  container.innerHTML = `
    <h4>Editing contact ${name} ${surname}</h4>
    <label class="form-label mt-2">Name</label>
    <input type="text"
      name="name"
      class="form-control form-control-sm"
      value="${name}"
    >
    <label class="form-label mt-2">Surname</label>
    <input type="text"
      name="surname"
      class="form-control form-control-sm"
      value="${surname}"
    >
    <label class="form-label mt-2">Phone</label>
    <input type="tel"
      name="phone"
      class="form-control form-control-sm"
      value="${phone}"
    >
    <label class="form-label mt-2">Email</label>
    <input type="email"
      name="email"
      class="form-control form-control-sm"
      value="${email}"
    >
    <input type="hidden" name="id" value="${id}">
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
