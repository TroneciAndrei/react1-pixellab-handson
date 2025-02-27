import { addMessage, clearMessages } from './notificationBar.js';
import {
  addContact,
  addPet,
  deleteContact,
  deletePet,
  editContact,
  getContact,
} from './querry.js';
import renderMessage from './message.js';
import { render as renderEditContact } from './editContact.js';
import { render as renderAddPet } from './addPet.js';
import { clearStage } from './clearStage.js';
import { render as renderEditPet } from './editPet.js';

const stage = document.querySelector('.stage');

// delete contact
stage.addEventListener('click', (event) => {
  // target, elementul de pecare a plecat evenimentul
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('delete-contact-button')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = parent.dataset.contactId;

  deleteContact(contactId);

  const confirmMessage = confirm('Are you sure?');

  if (confirmMessage) {
    parent.remove();
  }

  parent.remove();
  addMessage(renderMessage('Contact removed', 'success'));
});

// edit contact
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('edit-contact-button')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = parent.dataset.contactId;
  const contact = getContact(contactId);

  if (!contact) {
    return;
  }

  clearMessages();
  clearStage(stage);
  stage.append(renderEditContact(contact));
});

// edit pet
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('edit-pet-button')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const petId = parent.dataset.petId;
  const pet = getContact(petId);

  if (!pet) {
    return;
  }

  clearMessages();
  clearStage(stage);
  stage.append(renderEditPet(pet));
});

// cancel button
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('cancel-button')
  ) {
    return;
  }

  clearStage(stage);
});

// add contact button
stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== 'FORM' || !target.classList.contains('add-contact')) {
    return;
  }
  const form = target;

  // warning, these are HTML ELEMENTS (not values)
  const { name, surname, phone, email } = form;
  const contact = {
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    email: email.value,
    id: Number(Date.now().toString().slice(-6)),
  };

  addContact(contact);

  addMessage(
    renderMessage(`Contact ${name.value} ${surname.value} created.`, 'success'),
  );
  clearStage(stage);
});

// save edit contact
stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (
    target.nodeName !== 'FORM' ||
    !target.classList.contains('edit-contact')
  ) {
    return;
  }

  const form = target;
  const { name, surname, phone, email, id } = form;
  const contact = {
    name: name.value,
    surname: surname.value,
    phone: phone.value,
    email: email.value,
    id: Number(id.value),
  };

  editContact(contact);
});

stage.addEventListener('click', (event) => {
  // event.preventDefault not required for type button
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('add-pet-button')
  ) {
    return;
  }

  const button = target;
  const contactContainer = button.closest('.contact');
  const contactId = contactContainer.dataset.contactId;

  clearMessages();
  clearStage(stage);

  stage.append(renderAddPet(contactId));
});

stage.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;

  if (target.nodeName !== 'FORM' || !target.classList.contains('add-pet')) {
    return;
  }

  const form = target;
  // these are html elements
  const { age, name, species, contactId } = form;
  const { name: contactName, surname: contactSurname } = getContact(
    contactId.value,
  );

  const pet = {
    age: age.value,
    name: name.value,
    species: species.value,
    id: Number(Date.now().toString().slice(-6)),
  };

  addPet(contactId.value, pet);

  clearStage(stage);
  addMessage(
    renderMessage(
      `Pet ${name.value} added to contact ${contactName} ${contactSurname}.`,
      'success',
    ),
  );
});

// delete pet button
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('delete-pet-button')
  ) {
    return;
  }

  const button = target;
  const container = button.closest('.pet-container');
  const petId = Number(container.dataset.petId);
  const contactContainer = button.closest('.contact');
  const contactId = contactContainer.dataset.contactId;

  deletePet(contactId, petId);

  container.remove();
  addMessage(renderMessage('Pet removed', 'danger'));
});

export default stage;
