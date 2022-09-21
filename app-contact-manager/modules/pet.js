export const render = (pet) => {
  const { name, species, age, id } = pet;
  const container = document.createElement('article');
  container.classList.add('pet', 'mt-3');
  container.dataset.petId = id;

  container.innerHTML = `
    <h1>${name}</h1>
    <ul>
      <li>Name: ${name}</li>
      <li>Age: ${age}</li>
      <li>Species: ${species}</li>
    </ul>
    <footer class="mt-2">
      <button type="button"
        title="Delete"
        class="btn btn-secondary delete-pet-button"
      >Delete</button>
      <button type="button"
        title="Edit"
        class="btn btn-secondary edit-pet-button"
      >Edit</button>
    </footer>
  `;

  return container;
};
