import { body } from "express-validator";


export const categoryValidator = [
    body('name')
        .trim()
        .exists().withMessage("Category is required").bail()
        .isString().withMessage("Category must be a string").bail()
        .isLength({ min: 5, max: 50 }).withMessage("Category must be between 5 and 50 characters"),
    body('description')
        .trim()
        .exists().withMessage("Description is required").bail()
        .isString().withMessage("Description must be a string").bail()
        .isLength({ min: 10, max: 100 }).withMessage("Description must be between 10 and 100 characters")
]