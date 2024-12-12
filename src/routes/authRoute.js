const express = require('express');
const { loginController, registerController, logoutController } = require('../controllers/authController');
const authToken = require('../middleware/authToken');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Root path for authRoute');
  });  
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/logout', authToken, logoutController);

module.exports = router;
