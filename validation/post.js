import {body} from  'express-validator'

export const postValidator = [
    // body('title', "Минимум 5 символов").isLength({min: 5}),
    body('text', "Минимум 20 символов").isLength({min: 20}),
]