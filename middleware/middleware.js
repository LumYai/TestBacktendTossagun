const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const secret = process.env.SECRET

const authenticateToken = async (req, res, next) => {
    try {
        const authToken = req.cookies.token
        // เช็ค token จาก cookie
        if (authToken == null) return res.sendStatus(401)

        // ตรวจสอบ token และดึงข้อมูลจาก token
        const user = jwt.verify(authToken, secret)

        // ตรวจสอบว่า user ที่มีข้อมูลจาก JWT มีอยู่จริงใน database
        const checkUser = await User.findOne({ where: { email: user.email } })
        if (!checkUser) { return res.sendStatus(404)}

        req.user = user
        next()
    } catch (error) {
        console.error(error)
        return res.sendStatus(403)
    }
}

module.exports = authenticateToken
