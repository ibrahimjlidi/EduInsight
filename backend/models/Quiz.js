import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    questionsCount: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
