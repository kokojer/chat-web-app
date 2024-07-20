import { PostgresPubSub } from "graphql-pg-subscriptions";
import { Client } from "pg";

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "chat",
  password: "postgres",
  port: 5432,
});

client.connect();

export const pubSub = new PostgresPubSub({ client });
