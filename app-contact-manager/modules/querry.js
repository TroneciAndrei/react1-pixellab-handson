import contacts from './data.js';

export const findContact = (needle = 'query') => {
  const results = contacts.filter((contact) => {
    const values = Object.values(contact);
    // [1, 'Carol', 'Carolson', '0741..', 'carol@...']

    const haystack = values.reduce((haystack, value) => {
      if (typeof value === 'string') {
        haystack += value.toLowerCase();
      }

      return haystack;
    }, '');

    if (haystack.includes(needle)) {
      return true;
    }

    return false;
  });

  return results;
};

export const deleteContact = (contactId) => {
  contactId = Number(contactId);
  let contactIndex = -1;

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];

    if (contact.id === contactId) {
      contactIndex = i;

      break;
    }
  }

  if (contactIndex >= 0) {
    // splice mutates
    contacts.splice(contactIndex, 1);
  }
};

export const getContact = (contactId) => {
  contactId = Number(contactId);

  return contacts.find(({ id }) => {
    return id === contactId;
  });
};

export const addContact = (contact) => {
  // push mutates
  contacts.push(contact);
};

export const editContact = (contact) => {
  const existingContact = getContact(contact.id);

  const contactProperties = Object.keys(existingContact);

  for (let i = 0; i < contactProperties.length; i++) {
    const propertyName = contactProperties[i];

    existingContact[propertyName] = contact[propertyName];
  }
};

// add pet
export const addPet = (contactId, pet) => {
  const contact = getContact(contactId);
  contact.pets = contact.pets || [];

  contact.pets.push(pet);
};

// delete pet
export const deletePet = (contactId, petId) => {
  const contact = getContact(contactId);

  if (!contact.pets) {
    return;
  }

  let petIndex = -1;

  for (let i = 0; i < contact.pets.length; i++) {
    const pet = contact.pets[i];

    if (petId === pet.id) {
      petIndex = i;
    }
  }

  if (petIndex >= 0) {
    // splice mutates
    contact.pets.splice(petIndex, 1);
  }
};
