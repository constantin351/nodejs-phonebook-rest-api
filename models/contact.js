const {Schema, model} = require("mongoose");

const Joi = require("joi");

const {handleMongooseError} = require("../helpers");

const phoneRegexp = /\(\d{3}\) \d{3}-\d{4}/;

const contactSchema = Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
        match: phoneRegexp,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId, // тут сохраряется _id owner-a из коллекции user (генерируемый MongoDB)
        ref: 'user', // user - название коллекции, из которой взят этот _id
        required: true, //
    },
}, {versionKey: false, timestamps: true}); 
// {versionKey: false, timestamps: true} убирает версию __v из док-та и добавляет дату создания(createdAt) и дату обновления(updatedAt)

// ф-ция обработки ошибки для всех схем
contactSchema.post("save", handleMongooseError);

const addContactSchema = Joi.object({
    name: Joi.string().required().error(new Error('missing required name field')),
    email: Joi.string().email().required().error(new Error('missing required email field')),
    phone: Joi.string().pattern(phoneRegexp).required().error(new Error('missing required phone field')),
    favorite: Joi.boolean(),
});

const updateFavoriteFieldSchema = Joi.object({
    favorite: Joi.boolean().required(),
});

const schemas = {addContactSchema, updateFavoriteFieldSchema};

const Contact = model("contact", contactSchema);

module.exports = {Contact, schemas};