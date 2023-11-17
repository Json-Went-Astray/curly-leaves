import { DateTimeResolver } from "graphql-scalars";
import { createSchema, createYoga } from "graphql-yoga";
import { GraphQLScalarType } from "graphql";

import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as tq from "type-graphql";
import { registerEnumType } from "type-graphql";
import { mkdir } from "fs/promises";
import { graphqlUploadExpress } from "graphql-upload-ts";
import { createContext } from "./context.js";
import { UserResolver } from "./resolvers/User.js";
import { Context } from "./context.js";
import { User } from "./models/User.js";




dotenv.config();

const paths = [`${process.env.UPLOAD_DIR!}/user-avatars`];
for (const p of paths) {
  await mkdir(p, { recursive: true }).catch((e) => {
    if (e.code == "EEXIST") {
      return;
    } else {
      throw e;
    }
  });
}

const schema = await tq.buildSchema({
  resolvers: [
    UserResolver
  ],
  scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  validate: { forbidUnknownValues: false },
});
const yoga = createYoga({
  schema,
  context: createContext,
});


const app = express();
app.use(cors(), bodyParser.json());
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
app.use("/graphql", yoga);
//   app.use("*", serveStatic);

const httpServer = http.createServer(app);

httpServer.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000`);
});
