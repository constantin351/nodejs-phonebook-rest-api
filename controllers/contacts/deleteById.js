const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

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

module.exports = deleteById;