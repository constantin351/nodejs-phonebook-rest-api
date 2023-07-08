const fs = require('fs/promises');
const path = require("path");
const {nanoid} = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  try {
    const contactsJson = await fs.readFile(contactsPath);
    const contactsArr = JSON.parse(contactsJson);
    return contactsArr;
  } catch (error) {
    console.log(error);
  }
};


const getContactById = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const contactFoundById = contactsArr.find(contact => contact.id === contactId)

    if (!contactFoundById) return null;

    return contactFoundById;
} catch (error) {
    console.log(error);
}
};


const removeContact = async (contactId) => {
  try {
    const contactsArr = await listContacts();
    const index = contactsArr.findIndex((contact) => contact.id === contactId);

    if (index === -1) return null;

    const [removedContact] = contactsArr.splice(index, 1);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

    return removedContact;
  } catch (error) {
    console.log(error);
  }
};


const addContact = async (body) => {
  try {
    const contactsArr = await listContacts();
    const addedContact = { ...body, id: nanoid() };
    contactsArr.push(addedContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

    return addedContact;
  } catch (error) {
    console.log(error);
  }
};


const updateContact = async (contactId, body) => {
  try {
    const contactsArr = await listContacts();
    const updatedContactIdx = contactsArr.findIndex((contact) => contact.id === contactId);

    if (updatedContactIdx === -1) return null;
    if (!body) return null;

    const updatedContact = {...body, id: contactId};
    contactsArr.splice(updatedContactIdx, 1, updatedContact);

    await fs.writeFile(contactsPath, JSON.stringify(contactsArr));

    return updatedContact;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
