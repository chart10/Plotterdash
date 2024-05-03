import mongoose, { mongo } from 'mongoose';
import { JOB_STATUS } from '../../../utils/constants';

const taskSchema = new mongoose.Schema(
  {
    title: String,
    details: String,
    category: {
      type: String,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.GENERAL,
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
