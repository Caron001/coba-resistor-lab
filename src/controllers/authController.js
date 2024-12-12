const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { login, register, checkEmailExists } = require('../models/authModel');

const loginController = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await login({ email, password });
    const row = result[0];

    if (result.length === 0) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const match = await bcrypt.compare(password, row.password);
    if (match) {
      const payload = { email: row.email };
      const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '3d' });

      return res.status(200).json({
        message: 'Login Successful',
        loginResult: {
          id: row.id,
          email: row.email,
          token: accessToken,
        },
      });
    } else {
      return res.status(400).json({ message: 'Wrong Password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'An error occurred during login' });
  }
};

const registerController = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Username, email, and password are required' });
  }

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    const data = { username, email, password: hashedPassword };

    await register(data);
    return res.status(201).json({ message: 'Register successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'An error occurred during registration' });
  }
};

const logoutController = (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
};

module.exports = { loginController, registerController, logoutController };
