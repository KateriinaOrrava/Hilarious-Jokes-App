/* eslint-disable prettier/prettier */
import mongoose from 'mongoose';
const { Schema } = mongoose;
const jokeOnePartSchema = new Schema({
  category: String,
  joke: String,
  id: Number,
});

export default mongoose.model('JokeOnePart', jokeOnePartSchema, 'OnePartJoke');
