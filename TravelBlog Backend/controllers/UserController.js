import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'

export const register = async (req, res) => {
    try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        passwordHash: hash,
        avatarUrl: req.body.avatarUrl,
    });

    const user = await doc.save();

    const token = jwt.sign(
        {
            _id: user._id,
        },
        'secret123',
        {
            expiresIn: '30d',
        },
    );

    const {passwordHash, ...userData} = user._doc;

    res.json({
        ...userData,
        token});//express не может вернуть ответ с одним и тем же именем дважды
} catch (err) {
    console.log(err);
    res.status(500).json({
        message: 'Не удалось зарегистрироваться',
    });
    }
};

export const login = async (req,res) => {
    try {
        const user = await UserModel.findOne({email:req.body.email});
        if (!user) {
            return req.status(400).json({
                message: 'Не верный логин или пароль!'
            });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, user._doc.passwordHash);
        if (!isValidPassword){
            return res.status(400).json({
                message: 'Не верный логин или пароль!'
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret123',
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token});

    } catch (err) {
        console.log(err);
    res.status(500).json({
        message: 'Не удалось авторизироваться',
    });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message: 'Пользователь не найден',
            });
        }

        const {passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {console.log(err);
    res.status(500).json({
        message: 'Нет доступа',
    });
    }
};