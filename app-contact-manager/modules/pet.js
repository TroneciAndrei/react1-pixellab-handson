export const render = (pet) => {
  const { name, species, age, id } = pet;
  const container = document.createElement('article');
  container.classList.add('pet', 'mt-3');

  container.innerHTML = `
    <h1>${name}</h1>
    <ul>
      <li>Name: ${name}</li>
      <li>Age: ${age}</li>
      <li>Species: ${species}</li>
    </ul>
  `;

  return container;
};
