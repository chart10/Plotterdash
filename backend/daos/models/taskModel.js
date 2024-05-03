import mongoose, { mongo } from 'mongoose';
import { TASK_STATUS } from '../../../utils/constants.js';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    details: String,
    category: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.GENERAL,
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
