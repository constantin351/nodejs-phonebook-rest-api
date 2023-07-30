const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const getAll = async (req, res, next) => {
    const {_id: owner} = req.user; // id юзера из MDLWR authenticate
    const{page = 1, limit = 20} = req.query; // пагинация; обьект req.query содержит все параметры поиска
    const skip = (page - 1) * limit;
    
    // ищем контакты только данного юзера ({_id: owner} = req.user)
    // инструменты mongoose: skip - сколько пропустить, limit - сколько вернуть на странице
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email subscription"); 
  
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