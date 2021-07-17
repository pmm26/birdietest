import app from "./application";
const bodyParser = require("body-parser");
const openapi = require("express-openapi");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

// Hosts the doc file at /v1/api-docs to be used by swagger
openapi.initialize({
  app,
  apiDoc: require("./api/api-doc"),
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



