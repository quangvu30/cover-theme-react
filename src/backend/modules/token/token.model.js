import { Schema, model, models } from "mongoose";
import { TokenType } from "@/backend/constant/enum";

const TokenSchema = new Schema(
  {
    token: { type: String, unique: true, required: true },
    type: { type: String, enum: TokenType },
    expires: { type: Date },
    active: { type: Boolean, default: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const TokenModel = models.Token || model("Token", TokenSchema);

export default TokenModel;
