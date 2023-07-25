const {cntrlWrapper} = require("../../helpers");

const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const deleteById = require("./deleteById");
const updateById = require("./updateById");
const updateFavoriteField = require("./updateFavoriteField");

module.exports = {
    getAll: cntrlWrapper(getAll),
    getById: cntrlWrapper(getById),
    add: cntrlWrapper(add),
    deleteById: cntrlWrapper(deleteById),
    updateById: cntrlWrapper(updateById),
    updateFavoriteField: cntrlWrapper(updateFavoriteField),
}