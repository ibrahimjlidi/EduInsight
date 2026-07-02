import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema(
  {
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    score: { type: Number, required: true },
    timeSpentSeconds: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Result = mongoose.model('Result', resultSchema);

export default Result;
