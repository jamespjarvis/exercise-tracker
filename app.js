const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({ name: { type: String, required: true }});

const exerciseSchema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  description: String,
  duration: Number,
  date: { type: Date, default: Date.now }
})

mongoose.model('User', userSchema);
mongoose.model('Exercise', exerciseSchema);

