import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string; // Aquí puedes almacenar la URI en variables de entorno
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
