const { check } = require("express-validator");

exports.userSignupValidator = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("Ups, I guess you missed to type in your name!"),
  check("email")
    .isEmail()
    .withMessage(
      "Ups, I guess you misspelled something. Your email address is not valid!"
    ),
  check("password")
    .isLength(6)
    .withMessage("Ups, your password must be at least 6 characters long!")
];

exports.userSigninValidator = [
  check("email")
    .isEmail()
    .withMessage(
      "Ups, I guess you misspelled something. Your email address is not valid!"
    ),
  check("password")
    .isLength(6)
    .withMessage("Ups, your password must be at least 6 characters long!")
];
