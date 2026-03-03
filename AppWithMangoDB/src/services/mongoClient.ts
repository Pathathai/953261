import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("Missing MONGODB_URI");

const client = new MongoClient(uri);

// reuse a single connection (simple pattern for Express)
let connected = false;
export async function getMongoClient() {
  if (!connected) {
    await client.connect();
    connected = true;
  }
  return client;
}