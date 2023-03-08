import mongoose from 'mongoose';
const { Schema } = mongoose;
const jokeTwoPartSchema = new Schema({
  category: String,
  type: String,
  setup: String,
  delivery: String,
  flags: {
    nsfw: Boolean,
    religious: Boolean,
    political: Boolean,
    racist: Boolean,
    sexist: Boolean,
    explicit: Boolean,
  },
  id: Number,
  safe: Boolean,
  lang: String,
});

export default mongoose.model('JokeTwoPart', jokeTwoPartSchema, 'TwoPartJoke');
