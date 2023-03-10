import express from 'express';
import { Request, Response } from 'express';
import bodyparser from 'body-parser';
import JokeOnePart from './OnePartJokeSchema';
import JokeTwoPart from './TwoPartJoke.Schema';
//Cross-Origin Resource Sharing
import cors from 'cors';

import mongoose from 'mongoose';

const app = express();

app.use(bodyparser.json());
app.use(cors({ origin: '*' }));

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/jokeCatalog');

const db = mongoose.connection;
// db.createCollection("TwoPartJokes");
// db.createCollection("OnePartJokes");

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to DB'));

app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});

app.get('/onePartJokes', async (req: Request, res: Response) => {
  try {
    const all = await JokeOnePart.find({});
    res.send(all);
  } catch (error) {
    throw error;
  }
});
app.get('/twoPartJokes', async (req: Request, res: Response) => {
  try {
    const allTwoPartJokes = await JokeTwoPart.find({});
    res.send(allTwoPartJokes);
  } catch (error) {
    res.json('joke added');
    throw error;
  }
});

app.post(`/addOnePartJokes`, async ({ body }: Request, res: Response) => {
  try {
    await JokeOnePart.create(body);
  } catch (error) {
    throw error;
  }
  res.json('joke added');
});
app.post(`/addTwoPartJokes`, async ({ body }: Request, res: Response) => {
  try {
    await JokeTwoPart.create(body);
  } catch (error) {
    throw error;
  }
  res.json('joke added');
});

app.delete(
  `/jokeOnePartToDelete/:id`,
  async ({ params }: Request, res: Response) => {
    try {
      await JokeOnePart.deleteOne({ id: params.id });
    } catch (error) {
      throw error;
    }
    res.json(params.id);
  }
);
app.delete(
  `/jokeTwoPartToDelete/:id`,
  async ({ params }: Request, res: Response) => {
    try {
      await JokeTwoPart.deleteOne({ id: params.id });
    } catch (error) {
      throw error;
    }
    res.json(params.id);
  }
);

app.listen(3004, () => {
  console.log('Application started on port 3004!');
});
