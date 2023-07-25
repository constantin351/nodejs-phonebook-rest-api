const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

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

  module.exports = getById;