const bcrypt = require('bcryptjs')
const pool = require('../config/db')
const jwt = require('jsonwebtoken');
const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.redirect('/api/auth/register?error=All fields are required');
    }
    if (password.length < 8) {
        return res.redirect('/api/auth/register?error=Password must be at least 8 characters');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        console.log('Invalid email format')
        return res.redirect('/api/auth/register?error=Invalid email format');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)',
            [username, email, hashedPassword]
        );
        res.redirect('/api/auth/login?success=Registration successful. Please login.');
    } catch (err) {
        if (err.code === '23505') {
            res.redirect('/api/auth/register?error=Username or email already exists');
        } else {
            res.redirect('/api/auth/register?error=Server error');
        }
    }
};

const login = async (req, res) => {
    const { identifier, password, 'g-recaptcha-response': recaptchaToken } = req.body;
    if (!identifier || !password) {
        return res.redirect('/api/auth/login?error=All fields are required');
    }
    const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        { method: 'POST' }
    );
    const recaptchaData = await response.json();
    if (!recaptchaData.success) {
        return res.redirect('/api/auth/login?error=Invalid reCAPTCHA. Please try again.');
    }

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE username = $1 OR email = $1',
            [identifier]
        );
        const user = result.rows[0];
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.redirect('/api/auth/login?error=Invalid credentials');
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/api/auth/profile');
    } catch (err) {
        res.redirect('/api/auth/login?error=Server error')
    }
};


const profile = async (req, res) => {
    try {
        console.log(req.user)
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
        console.log(result)
        res.render('profile', { user: result.rows[0] });
    } catch (err) {
        console.log("error", err)
        res.redirect('/api/auth/login?error=Server error');
    }
};

const logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/api/auth/login');
};

module.exports = {
    register,
    login,
    profile,
    logout
}
