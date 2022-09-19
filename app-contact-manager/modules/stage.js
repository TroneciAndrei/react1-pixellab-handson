import { addMessage, clearMessages } from './notificationBar.js';
import { deleteContact, getContact } from './querry.js';
import renderMessage from './message.js';
import { render as renderEditContact } from './editContact.js';

const stage = document.querySelector('.stage');

// delete contact
stage.addEventListener('click', (event) => {
  // target, elementul de pe care a plecat evenimentul
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    !target.classList.contains('delete-friend')
  ) {
    return;
  }

  const button = target;
  const parent = button.parentElement;
  const contactId = parent.dataset.contactId;

  deleteContact(contactId);
  // confirm delete
  const confirmMessage = confirm('Are you sure?');

  if (confirmMessage) {
    parent.remove();
  }

  addMessage(renderMessage('Contact removed', 'success'));
});

// edit contact
stage.addEventListener('click', (event) => {
  const { target } = event;

  if (
    target.nodeName !== 'BUTTON' ||
    target.classList.contains('edit-contact')
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
  stage.innerHTML = '';
  stage.append(renderEditContact(contact));
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

  stage.innerHTML = '';
});

// save edit contact button

export default stage;
