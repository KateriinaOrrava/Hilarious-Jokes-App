import mongoose from "mongoose";
const { Schema } = mongoose;
const jokeOnePartSchema = new Schema({
  category: String,
  type: String,
  joke: String,
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

export default mongoose.model("JokeOnePart", jokeOnePartSchema, "OnePartJoke");
