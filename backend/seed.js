import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Course from './models/Course.js';

dotenv.config();

const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/eduinsight';

const sampleUsers = [
  { name: 'Alice Professor', email: 'alice.teacher@example.com', password: 'Password123!', role: 'teacher' },
  { name: 'Bob Student', email: 'bob.student@example.com', password: 'Password123!', role: 'student' },
  { name: 'Cara Student', email: 'cara.student@example.com', password: 'Password123!', role: 'student' },
];

const sampleCourses = [
  { title: 'AI Automation Foundations', category: 'Automation', lessons: 12, level: 'Intermediate', description: 'Design practical automation flows and evaluate intelligent decision-making patterns.' },
  { title: 'Modern Web Development', category: 'Web Development', lessons: 16, level: 'Advanced', description: 'Create resilient frontends with reusable component systems and state architecture.' },
  { title: 'Embedded Systems Design', category: 'Engineering', lessons: 10, level: 'Beginner', description: 'Understand hardware logic and embedded data pipelines through guided labs.' },
];

const sampleQuizzes = [
  { title: 'Automation - Quiz 1', questionsCount: 10 },
  { title: 'WebDev - Midterm', questionsCount: 8 },
  { title: 'Embedded - Basics', questionsCount: 12 },
];

const sampleResults = [
  // will be generated dynamically per student/quiz
];

const run = async () => {
  try {
    await mongoose.connect(MONGO);
    console.log('Connected to MongoDB for seeding');

    // Clean existing data
    await User.deleteMany({});
    await Course.deleteMany({});

    // Insert users
    const createdUsers = [];
    for (const u of sampleUsers) {
      const user = await User.create(u);
      createdUsers.push(user);
      console.log('Created user:', user.email);
    }

    // Find a teacher to assign as course owner
    const teacher = createdUsers.find((x) => x.role === 'teacher');

    // Insert courses referencing the teacher (if any)
    const createdCourses = [];
    for (const c of sampleCourses) {
      const course = await Course.create({ ...c, createdBy: teacher ? teacher._id : undefined });
      createdCourses.push(course);
      console.log('Created course:', course.title);
    }

    // Insert quizzes linked to courses
    const Quiz = (await import('./models/Quiz.js')).default;
    const Result = (await import('./models/Result.js')).default;

    const createdQuizzes = [];
    for (let i = 0; i < sampleQuizzes.length; i++) {
      const qTemplate = sampleQuizzes[i];
      const course = createdCourses[i % createdCourses.length];
      const quiz = await Quiz.create({ ...qTemplate, course: course._id });
      createdQuizzes.push(quiz);
      console.log('Created quiz:', quiz.title);
    }

    // Generate simple results for students
    const students = createdUsers.filter((x) => x.role === 'student');
    for (const student of students) {
      for (const quiz of createdQuizzes) {
        const score = Math.floor(60 + Math.random() * 40); // 60-99
        await Result.create({ student: student._id, quiz: quiz._id, score, timeSpentSeconds: Math.floor(Math.random() * 900) });
      }
    }

    console.log('Created quizzes and student results.');

    console.log('Seeding completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

run();
