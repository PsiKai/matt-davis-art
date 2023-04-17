const { body } = require("express-validator")

function contactFormSanitizer() {
  return [
    body("name").escape(),
    body("address").normalizeEmail(),
    body("subject").escape(),
    body("body").escape(),
  ]
}

module.exports = { contactFormSanitizer }
