import { addMessage, clearMessages } from './notificationBar.js';
import { findContact } from './querry.js';
import render from './message.js';
import { pluralize } from './utils.js';
import stage from './stage.js';
// do not ommit {} for named exports
import { render as renderContact } from './contact.js';

const searchForm = document.querySelector('.search-form');

searchForm.addEventListener('submit', (event) => {
  // currentTarget este elementul pe care am rulat addeventlistener
  event.preventDefault();
  const form = event.currentTarget;
  const queryInput = form.q;

  clearMessages();

  const contacts = findContact(queryInput.value.toLowerCase().trim());
  const contactsCount = contacts.length;
  const fragment = new DocumentFragment();

  contacts.forEach((contact) => {
    fragment.append(renderContact(contact));
  });

  if (queryInput.value.length < 3) {
    return;
  }

  if (contacts.length <= 0) {
    addMessage(
      render(
        `No contacts found. Search term incorrect: '${queryInput.value}'`,
        'warning',
      ),
    );
  } else {
    const petsCount = contacts.reduce((petsCount, contact) => {
      const { pets = [] } = contact;
      petsCount += pets.length;

      return petsCount;
    }, 0);

    addMessage(
      render(
        `Found ${pluralize(contactsCount, {
          one: 'contact',
          many: 'contacts',
        })} with ${
          petsCount <= 0
            ? 'no pets'
            : pluralize(petsCount, {
                one: 'pet',
                many: 'pets',
              })
        }. Search term was: '${queryInput.value}'`,
        'success',
      ),
    );
  }

  queryInput.value = '';
  stage.innerHTML = '';
  stage.append(fragment);
});

export default searchForm;
