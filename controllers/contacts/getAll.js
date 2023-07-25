const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getAll = async (req, res, next) => {
    const {_id: owner} = req.user;
    const{page = 1, limit = 20} = req.query; // пагинация
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription"); // инструменты mongoose: skip - сколько пропустить, limit - сколько вернуть на странице
  
    if (!result) {
      throw HttpError(404, "Not found");
    }
  
    res.json({
      status: "success",
      code: 200,
      data: { contacts: result },
    });
  };

  module.exports = getAll;