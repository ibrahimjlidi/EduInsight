import express from 'express';
import auth from '../middleware/auth.js';
import { listCourses, listQuizzes, listResults } from '../controllers/adminController.js';

const router = express.Router();

// Protect these routes; teachers only for some endpoints
router.get('/courses', auth, listCourses);
router.get('/quizzes', auth, listQuizzes);
router.get('/results', auth, listResults);

export default router;
