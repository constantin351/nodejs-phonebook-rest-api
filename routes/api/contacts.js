const express = require("express");

const cntrl = require("../../controllers/contacts");
const {validateBodyWithJoi, isValidId} = require("../../middlewares");
const {schemas} = require("../../models/contact");

const router = express.Router();

// get all
router.get("/", cntrl.getAll);

// get with ID
router.get("/:contactId", isValidId, cntrl.getById);

// add new (with body)
router.post("/", validateBodyWithJoi(schemas.addContactSchema), cntrl.add);

// delete with ID
router.delete("/:contactId", isValidId, cntrl.deleteById);

// update with ID & body
router.put("/:contactId", isValidId, validateBodyWithJoi(schemas.addContactSchema), cntrl.updateById);

// partial update with ID & body
router.patch("/:contactId/favorite", isValidId, validateBodyWithJoi(schemas.updateFavoriteFieldSchema), cntrl.updateFavoriteField);

module.exports = router;
