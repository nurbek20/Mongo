const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')
const User = require("../models/User")


const router = Router()

router.post('/registration',
    [
        body('email', "Некорректный Email").isEmail(),
        body('password', 'Некорректный Пароль').isLength({ min: 5 })
    ],
    async (req, res) => {
        console.log("reqBody>>>", req.body)
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Некоррекный данные при регистрация"
                })
            } ``

            const { email, password } = req.body

            const isUsed = await User.findOne({ email })
            if (isUsed) {
                return res.status(300).json({
                    message: "Данный Email уже занять попробуйте другой"
                })
            }
            const hashedPassword = await bcrypt.hash(password, 12)

            const user = new User({
                email, password: hashedPassword
            })
            await user.save()
            res.status(201).json({
                message: "Пользователь создан"
            })

        } catch (err) { console.log(err) }
    })

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Такого Email нет в базе"
            })
        }
        const isMatch = bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Не верный пароль или Email"
            })
        }
        const jwtSecret = "secret123"

        const token = jwt.sign(
            { userId: user.id },
            jwtSecret,
            { expiresIn: '4h' }
        )
        res.json({ token, userId: user.id })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router

