import Course from '../models/Course.js';
import Quiz from '../models/Quiz.js';
import Result from '../models/Result.js';

export const listCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('createdBy', 'name email');
    res.json({ data: courses });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('course', 'title category');
    res.json({ data: quizzes });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const listResults = async (req, res) => {
  try {
    const results = await Result.find().populate('student', 'name email').populate('quiz', 'title');
    res.json({ data: results });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
