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
import { MediaResolver } from "./resolvers/Media.js";
import serveStatic from "serve-static";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { ProductResolver } from "./resolvers/Product.js";

dotenv.config();
process.env.NODE_ENV = "development";
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
  resolvers: [UserResolver, MediaResolver, ProductResolver],
  scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }],
  validate: { forbidUnknownValues: false },
});
const yoga = createYoga({
  schema,
  context: createContext,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors(), bodyParser.json({ limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

app.use("/graphql", (req, res) => {
  yoga(req, res);
});
app.use("/uploads", express.static(join(__dirname, "../uploads")));

const httpServer = http.createServer(app);

httpServer.listen({ port: 4000 }, () => {
  console.log(`Server ready at http://localhost:4000`);
  console.log(join(__dirname, "../uploads"));
});
