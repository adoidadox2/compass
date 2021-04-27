import 'dotenv/config';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { citySeed, customerSeed } from './seeds';

const mongoServer = new MongoMemoryServer();

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connect = async () => {
  await mongoose.disconnect();

  const mongoUri = await mongoServer.getUri();
  await mongoose.connect(mongoUri, mongooseConfig);
};

const close = async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
};

const clear = async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    // eslint-disable-next-line no-await-in-loop
    await collection.deleteMany({});
  }
};
beforeAll(async () => {
  await connect();

  await citySeed();
  await customerSeed();
});

afterAll(async () => {
  await clear();
  await close();
});
