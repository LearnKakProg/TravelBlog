import {body} from 'express-validator';

export const loginValidation =[
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
];

export const registerValidation =[
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5}),
    body('fullName', 'Укажите имя').isLength({ min: 3}),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Заголовок статьи пустой').isString().isLength({min: 5}),
    body('text', 'Статья должна иметь текст').isLength({ min: 5}).isString(),
    body('cost', 'Статья должна иметь стоимость').isLength({ min: 1}).isString(),
    body('culturPlaces', 'Статья должна иметь места культурного наследия').isLength({ min: 5}).isString(),
    body('toVisitPlaces', 'Статья должна иметь места для посещения').isLength({ min: 5}).isString(),
    body('tags', 'Укажите тег(и) на английском языке').optional().isString().isAscii(),
    body('imageUrl', 'Неверная ссылка').optional().isString(),
    body('rating', 'Статья должна иметь оценку путешествия').isLength({ min: 5}).isString()]