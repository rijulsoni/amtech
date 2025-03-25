const express = require('express')
const router = express.Router()
const { register, login, profile, logout} = require('../controllers/auth.controller')
const { authenticateToken } = require('../middlewares/auth.middleware')
const rateLimit = require('express-rate-limit')
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 5,
    handler: (req, res) => {
        res.redirect('/api/auth/login?error=Too many login attempts, try again after 15 minutes');
    },
});
router.get('/register', (req, res) => {
    res.render('register', { error: req.query.error, success: req.query.success })
})
router.get('/login', (req, res) => {
    res.render('login', { error: req.query.error, success: req.query.success })
})
router.get('/profile', authenticateToken, profile)
router.post('/register', register)
router.post('/login', loginLimiter, login)
router.get('/logout', authenticateToken, logout)

module.exports = router