import mongoose from 'mongoose';

const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
class DefaultDatabase {
  constructor() {
    if (process.env.NODE_ENV !== 'test') {
      this.init();
    }
  }

  init() {
    mongoose
      .connect(`${process.env.DB_URL}`, mongooseConfig)
      .then(() => {
        console.log(
          `Connection successfully with MongoDB at ${process.env.DB_URL}`,
        );
      })
      .catch(() => {
        console.log(
          `Connection unsuccessfully with MongoDB at ${process.env.DB_URL}`,
        );
      });
  }
}

export default new DefaultDatabase();
