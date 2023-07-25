const express = require("express");

const cntrl = require("../../controllers/contacts");

const {validateBodyWithJoi, isValidId, authenticate} = require("../../middlewares");
const {schemas} = require("../../models/contact");

const router = express.Router();

// get all
router.get("/", authenticate, cntrl.getAll);

// get with ID
router.get("/:contactId", authenticate, isValidId, cntrl.getById);

// add new (with body)
router.post("/", authenticate, validateBodyWithJoi(schemas.addContactSchema), cntrl.add);

// delete with ID
router.delete("/:contactId", authenticate, isValidId, cntrl.deleteById);

// update with ID & body
router.put("/:contactId", authenticate, isValidId, validateBodyWithJoi(schemas.addContactSchema), cntrl.updateById);

// partial update with ID & body
router.patch("/:contactId/favorite", authenticate, isValidId, validateBodyWithJoi(schemas.updateFavoriteFieldSchema), cntrl.updateFavoriteField);

module.exports = router;
