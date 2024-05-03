import mongoose, { mongo } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    details: String,
    category: {
      type: String,
      enum: ['general', 'work', 'school', 'finance', 'pet', 'social', 'chores'],
      default: 'general',
    },
    complete: {
      type: Boolean,
      default: false,
    },
    dueDate: Date,
  },
  { timestamps: true }
);

export default mongoose.model('Task', taskSchema);
