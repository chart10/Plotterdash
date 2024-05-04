import mongoose, { mongo } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  role: {
    enum: ['users', 'admin'],
    default: 'admin',
  },
});

export default mongoose.model('User', UserSchema);
