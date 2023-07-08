const contactsOperations = require("../models/contacts");

const { HttpError, cntrlWrapper } = require("../helpers");
  
const getAll = async (req, res, next) => {
      const result = await contactsOperations.listContacts();
      
      if (!result) {
        throw HttpError(404, "Not found");
      };
  
      res.json({
        status: "success",
        code: 200,
        data: { contacts: result },
      });

  };

  const getById = async (req, res) => {
      const contactId = req.params.contactId;
      const result = await contactsOperations.getContactById(contactId);
  
      if (!result) {
        throw HttpError(404, "Not found");
      };
  
      res.status(200).json({
        status: "success",
        code: 200,
        data: { result },
      });
  };

  
  const add = async (req, res) => {
    const result = await contactsOperations.addContact(req.body);

    res.status(201).json({
        status: "success",
        code: 201,
        data: { result },
    });
};

const deleteById = async (req, res) => {
      const { contactId } = req.params;
      const result = await contactsOperations.removeContact(contactId);
  
      if (!result) {
        throw HttpError(404, "Not found");
      };
  
      res.status(200).json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
};

const updateById = async (req, res) => {    
      const { contactId } = req.params;
      const result = await contactsOperations.updateContact(contactId, req.body);
  
      if (!result) {
        throw HttpError(404, "Not found");
      };
  
      res.status(200).json({
        status: "success",
        code: 200,
        data: { result },
      });
  };

  module.exports = {
    getAll: cntrlWrapper(getAll),
    getById: cntrlWrapper(getById),
    add: cntrlWrapper(add),
    deleteById: cntrlWrapper(deleteById),
    updateById: cntrlWrapper(updateById),
  };