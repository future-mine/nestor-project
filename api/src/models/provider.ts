import { Schema, model } from "mongoose";

const ProviderSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export interface ProviderModel {
  _id?: string;
  name: string;
}
export default model<ProviderModel>("Provider", ProviderSchema);
