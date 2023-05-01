import { Schema, model } from "mongoose";
export interface Design {
  id: string;
  name: string;
  price: number;
  tags: string[];
  manufacturer: string;
  stars: number;
  imageUrl: string;
}

export const DesignSchema = new Schema<Design>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    manufacturer: { type: String, required: true },
    stars: { type: Number, required: true },
    imageUrl: { type: String, required: true },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

export const DesignModel = model<Design>("design", DesignSchema);
