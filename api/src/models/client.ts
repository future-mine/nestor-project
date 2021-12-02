import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
    name: String,
    email: String,
    phone: String,
    providers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Provider",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export interface ClientModel {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  providers: string[];
}

export default model<ClientModel>("Client", ClientSchema);
