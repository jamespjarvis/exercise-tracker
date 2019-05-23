const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ name: { type: String, required: true, unique: true }});

const exerciseSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  description: {type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date, default: Date.now }
})

mongoose.model('User', userSchema);
mongoose.model('Exercise', exerciseSchema);

