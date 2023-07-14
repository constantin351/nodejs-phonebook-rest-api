const { Contact } = require("../models/contact");

const { HttpError, cntrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Contact.find();

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    status: "success",
    code: 200,
    data: { contacts: result },
  });
};

const getById = async (req, res) => {
  const contactId = req.params.contactId;
  // const result = await Contact.findOne({_id: contactId}); // альтернативный вариант
  const result = await Contact.findById(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  res.status(201).json({
    status: "success",
    code: 201,
    data: { result },
  });
};

const deleteById = async (req, res) => {
      const { contactId } = req.params;
      const result = await Contact.findByIdAndRemove(contactId);

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
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }); // {new: true} возвращает добавленный (обновленный обьект), а не старый
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({
    status: "success",
    code: 200,
    data: { result },
  });
};

const updateFavoriteField = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  }); 
  // {new: true} возвращает добавленный (обновленный обьект), а не старый
  if (!result) {
    throw HttpError(404, "Not found");
  }

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
  updateFavoriteField: cntrlWrapper(updateFavoriteField),
};
