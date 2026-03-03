import { ObjectId } from "mongodb";
import { getMongoClient } from "./mongoClient";

export type Item = {
  id?: number;            // keep your old id if you want
  name: string;
  description: string;
};

const DB_NAME = process.env.DB_NAME || "productDb";
const COLLECTION = "items";

async function col() {
  const client = await getMongoClient();
  return client.db(DB_NAME).collection<Item>(COLLECTION);
}

export async function getAllItems(): Promise<Item[]> {
  return (await col()).find({}).toArray();
}

export async function getItemsByName(name: string): Promise<Item[]> {
  if (!name) return [];
  return (await col())
    .find({ name: { $regex: name, $options: "i" } })
    .toArray();
}


export async function getItem(id: number): Promise<Item | null> {
  return (await col()).findOne({ id });
}

export async function addItem(item: Item): Promise<string> {
  const result = await (await col()).insertOne(item);
  return result.insertedId.toString();
}