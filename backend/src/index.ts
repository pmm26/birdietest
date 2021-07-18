import app from "./application";
const bodyParser = require("body-parser");
const openapi = require("express-openapi");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const port = process.env.PORT || 8000;

const YAML= require('yamljs')
const doc = YAML.load('src/api/api-doc.yml')

app.use(cors());
app.use(bodyParser.json());

// console.log(doc)
// Hosts the doc file at /v1/api-docs to be used by swagger
openapi.initialize({
  app,
  apiDoc: doc,
  paths: path.resolve(__dirname, "api/v1"),
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

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});



