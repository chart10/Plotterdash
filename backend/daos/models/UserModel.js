import mongoose, { mongo } from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

UserSchema.methods.toJSON = function () {
  let object = this.toObject();
  delete object.password;
  return object;
};

export default mongoose.model('User', UserSchema);
