import { body } from "express-validator";

export const blogValidator = [
    body('title')
        .trim()
        .exists().withMessage("Title is a required field").bail()
        .isString().withMessage("Title must be string").bail()
        .isLength({ min: 5, max: 150 }).withMessage("Title must be between 5 and 150 charaacters"),
    body('content')
        .trim()
        .exists().withMessage("Content is a required field").bail()
        .isString().withMessage("Content must be string").bail()
        .isLength({ min: 100, maax: 10000 }).withMessage("Content must be between 100 and 10000 characters"),
    body('excerpt')
        .trim()
        .exists().withMessage("Excerpt is a required field").bail()
        .isString().withMessage("Excerpt must be string").bail()
        .isLength({ min: 10, max: 100 }).withMessage("Excerpt must be between 10 and 100 characters"), 
]