export const getContacts = () => {
  try {
    const existedContacts = localStorage.getItem('contacts');

    if (existedContacts) {
      const contacts = JSON.parse(existedContacts);
      return contacts;
    }
  } catch (err) {
    throw new Error('Error: ', err);
  }
};

export const saveContacts = contacts => {
  try {
    const toSaveContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', toSaveContacts);
  } catch (err) {
    throw new Error('Error: ', err);
  }
};
