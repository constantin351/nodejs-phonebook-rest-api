const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    }); // {new: true} возвращает добавленный (обновленный) обьект, а не старый
    if (!result) {
      throw HttpError(404, "Not found");
    }
  
    res.status(200).json({
      status: "success",
      code: 200,
      data: { result },
    });
  };

  module.exports = updateById;