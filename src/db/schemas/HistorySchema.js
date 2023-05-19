import { Schema } from "mongoose";

const HistorySchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    ip: {
      type: String,
      required: true,
    },
    nmapResult: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default HistorySchema;
