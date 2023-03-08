/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
const { Schema } = mongoose;
const jokeTwoPartSchema = new Schema({
  category: String,
  setup: String,
  delivery: String,
  id: Number,
});

export default mongoose.model('JokeTwoPart', jokeTwoPartSchema, 'TwoPartJoke');
