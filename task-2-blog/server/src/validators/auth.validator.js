
import { body } from "express-validator";

export const registerValidator = [
    body("name")
        .trim()
        .exists().withMessage("Name is required")
        .bail()
        .isString().withMessage("Name must be a string")
        .bail()
        .isLength({ min: 2, max: 50 })
        .withMessage("Name must be between 2 and 50 characters"),

    body("email")
        .trim()
        .exists().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("A valid email address is required")
        .normalizeEmail(),

    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 and 128 characters").bail()
        .matches(/[a-z]/).withMessage("Password must contain a lowercase letter").bail()
        .matches(/[A-Z]/).withMessage("Password must contain an uppercase letter").bail()
        .matches(/[0-9]/).withMessage("Password must contain a number"),
];


export const loginValidator = [
    body("email")
        .trim()
        .exists().withMessage("Email is required")
        .bail()
        .isEmail().withMessage("A valid email address is required")
        .normalizeEmail(),

    body("password")
        .exists().withMessage("Password is required").bail()
        .isString().withMessage("Password must be a string").bail()
        .isLength({ min: 8, max: 128 })
        .withMessage("Password must be between 8 and 128 characters"),
];