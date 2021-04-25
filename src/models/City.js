import { Schema, model } from 'mongoose';

const CitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },

  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default model('City', CitySchema);
