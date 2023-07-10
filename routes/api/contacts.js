const express = require("express");

const cntrl = require("../../controllers/contacts");
const {validateBodyWithJoi} = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const router = express.Router();

// get all
router.get("/", cntrl.getAll);

// get with ID
router.get("/:contactId", cntrl.getById);

// add new (with body)
router.post("/", validateBodyWithJoi(schemas.addContactSchema), cntrl.add);

// delete with ID
router.delete("/:contactId", cntrl.deleteById);

// update with ID & body
router.put("/:contactId", validateBodyWithJoi(schemas.addContactSchema), cntrl.updateById);

module.exports = router;
