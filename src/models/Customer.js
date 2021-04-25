import { Schema, model } from 'mongoose';

const CustomerSchema = new Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    birth_date: {
      type: Date,
      required: true,
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'City',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default model('Customer', CustomerSchema);
