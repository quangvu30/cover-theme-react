import { Schema, model, models } from "mongoose";

const LoginHistorySchema = new Schema(
  {
    ipAddress: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const LoginHistoryModel =
  models.LoginHistory || model("LoginHistory", LoginHistorySchema);

export default LoginHistoryModel;
