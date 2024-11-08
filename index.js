require('dotenv').config()
const express = require('express')
const sequelize = require('./sequelize/sequelize')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const authenticateToken = require('./middleware/middleware')

const User = require('./models/userModel')
const Product = require('./models/productModel')
const Order = require('./models/orderModel')

const app = express()
const port = 3000
const secret = process.env.SECRET

// ใช้ bodyParser เพื่อให้สามารถรับข้อมูลจาก request body
app.use(express.json())
app.use(cookieParser())

// ---------- API 
// register
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body
        const passwordHash = await argon2.hash(password)
        const result = await User.create({
            name,
            email,
            password: passwordHash
        })
        res.json({
            message: 'register OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})

// login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const hash = await User.findOne({ where: { email }})
        const result = await argon2.verify(hash.password, password) ? 'Password is correct!' : 'Password is incorrect.'
        const token = jwt.sign({ email }, secret, { expiresIn: '1h' })
        res.cookie('token', token, {
            maxAge: 300000,
            secure: true,
            httpOnly: true,
            sameSite: 'none'
        })
        res.json({
            message: 'login OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(401)
        res.json({
            message: 'error',
            error
        })
    }
})

// logout
app.post('/api/logout', authenticateToken, (req, res) => {
    // ลบ cookie ที่เก็บ JWT
    try {
        res.clearCookie('token')
        res.sendStatus(200)
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})

// --------------------Product------------------------------------

// allproduct
app.get('/api/allproduct', authenticateToken, async (req, res) => {
    try {
        const result = await Product.findAll()
        res.json({
            message: 'allproduct OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})

// create_product
app.post('/api/create_product', authenticateToken, async (req, res) => {
    try {
        const product = req.body
        const userId = await User.findOne({ where: { email: req.user.email }})
        product.ownerId = userId.id
        const result = await Product.create(product)
        res.json({
            message: 'create product OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})

// update_product
// update ชื่อ หรือ/และ ราคา
app.post('/api/update_product', authenticateToken, async (req, res) => {
    try {
        const { productId, productName, price } = req.body
        const updateData = {}
        // เช็ค สินค้าเป็นของผู้ใช้งานถึง update ได้
        const userId = await User.findOne({ where: { email: req.user.email }})
        if (productName) { updateData.productName = productName }
        if (price) { updateData.price = price }
        const result = await Product.update(
            updateData,
            {
                where: {
                    id: productId,
                    ownerId: userId.id
                }
            }
        )
        // productid ไม่ตรง userid
        if (result[0] === 0) return res.sendStatus(400)
        res.json({
            message: 'update product OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})


// delete product
app.delete('/api/delete_product', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body
        // เช็ค สินค้าเป็นของผู้ใช้งานถึง delete ได้
        const userId = await User.findOne({ where: { email: req.user.email }})
        const product = await Product.destroy({ 
            where: { 
                id: productId,
                ownerId: userId.id
            }
        })
        // productid ไม่ตรง userid
        if (product === 0) return res.sendStatus(400)
        res.json({
            message: 'delete product OK',
            product
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
    
})

// --------------------Order------------------------------------

// create_order
app.post('/api/create_order', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body
        const product = await Product.findOne({ where: { id: productId }})
        const userId = await User.findOne({ where: { email: req.user.email }})
        const result = await Order.create({
            productName: product.productName,
            price: product.price,
            buyerId: userId.id,
            status: 'PENDING'
        })
        res.json({
            message: 'create order OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})


// all order ออเดอร์ทั้งหมดของ user นั้นๆ
app.get('/api/all_order', authenticateToken, async (req, res) => {
    try {
        const userId = await User.findOne({ where: { email: req.user.email }})
        const result = await Order.findAll({ where: { buyerId: userId.id } })
        res.json({
            message: 'all order OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
    
})


// confirm_order
// ยืนยันการซื้อ
app.post('/api/confirm_order', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body
        // เช็ค สินค้าเป็นของผู้ใช้งานถึง update ได้
        const userId = await User.findOne({ where: { email: req.user.email }})
        const result = await Order.update(
            { status: 'COMPLETED' },
            {
                where: {
                    id: productId,
                    buyerId: userId.id,
                    status: 'PENDING'
                }
            }
        )
        // productid ไม่ตรง userid
        if (result[0] === 0) return res.sendStatus(400)
        res.json({
            message: 'confirm order OK',
            result
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
})

// delete order
app.delete('/api/delete_order', authenticateToken, async (req, res) => {
    try {
        const { productId } = req.body
        // เช็ค สินค้าเป็นของผู้ใช้งานถึง delete ได้
        const userId = await User.findOne({ where: { email: req.user.email }})
        const order = await Order.destroy({ 
            where: { 
                id: productId,
                buyerId: userId.id,
                status: 'PENDING'
            }
        })
        // productid ไม่ตรง userid
        if (order === 0) return res.sendStatus(400)
        res.json({
            message: 'delete order OK',
            order
        })
    } catch (error) {
        console.log('error: ', error)
        res.status(400)
        res.json({
            message: 'error',
            error
        })
    }
    
})

// ---------- SERVER
async function startServer() {
    try {
        await sequelize.sync()
        app.listen(port, () => {
            console.log(`API server is running on http://localhost:${port}`)
        })
    } catch (error) {
        console.error('Error syncing database:', error)
    }
}

startServer()
