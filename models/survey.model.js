import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  questionText: String,
  options: [String],
  responseType: {
    type: String,
    enum: ['text', 'multiple_choice'],
    required: true,
  },
});

const SurveySchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: [QuestionSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Survey', SurveySchema);