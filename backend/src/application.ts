import * as express from "express";
import { pingController } from "./controllers/ping";

require('dotenv').config()

const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const openapi = require("express-openapi");
const yaml = require('js-yaml');
const fs   = require('fs');

const port = process.env.PORT || 8000;

let doc 
try {
  doc = yaml.load(fs.readFileSync(path.resolve(__dirname, "api/api-doc.yml"), 'utf8'));
} catch (e) {
  console.log(e);
}

app.use(cors());
app.use(bodyParser.json());
app.use(pingController);

openapi.initialize({
  app,
  apiDoc: doc,
  paths: path.resolve(__dirname, "api/v1"),
  securityHandlers: {
    ApiKeyAuth: function (req: any, _scopes: any, _definition: any) {
      console.log(req.headers);
      if (req.headers["x-api-key"] !== process.env.API_KEY) {
        throw {
          status: 401,
          message: "You must authenticate to access birdie api.",
        };
      } else {
        return Promise.resolve(true);
      }
    },
  },
});

app.use(
  "/api-documentation",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: `http://localhost:${port}/v1/api-docs`,
    },
  })
);

app.use((err: any, _req: any, res: any, _next: any) => {
  // format error
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

export default app;
