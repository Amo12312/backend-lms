import express from 'express';
// import router from express.Router();
import { signup, login } from '../controllers/authController.js';
import { validateSignup, validateLogin } from '../middleware/validation.js';

const router = express.Router();
// Signup route
router.post('/signup', validateSignup, signup);

// Login route
router.post('/login', validateLogin, login);

export default router;