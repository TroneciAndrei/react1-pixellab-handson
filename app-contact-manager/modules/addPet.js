import { getContact } from './querry.js';

export const render = (contactId) => {
  const container = document.createElement('form');
  container.classList.add('add-pet');

  const { name, surname } = getContact(contactId);

  container.innerHTML = `
    <h4>Add a new pet for ${name} ${surname}.</h4>
    <label class="form-label mt-2">Name</label>
    <input type="text" name="name" class="form-control form-control-sm">
    <label class="form-label mt-2">Species</label>
    <input type="text" name="species" class="form-control form-control-sm">
    <label class="form-label mt-2">Age</label>
    <input type="text" name="age" class="form-control form-control-sm">
    <input type="hidden" value="${contactId}" name="contactId">
    <div class="mt-2">
      <button type="submit" class="btn btn-secondary me-1" title="Save">Save</button>
      <button type="button" class="cancel-button btn btn-secondary" title="Cancel">Cancel</button>
    </div>
  `;

  return container;
};
