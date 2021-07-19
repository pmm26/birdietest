import app from "./application";
const bodyParser = require("body-parser");
const openapi = require("express-openapi");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const path = require("path");
const port = process.env.PORT || 8000;

const YAML = require("yamljs");
const doc = YAML.load("src/api/api-doc.yml");

app.use(cors());
app.use(bodyParser.json());

openapi.initialize({
  app,
  apiDoc: doc,
  paths: path.resolve(__dirname, "api/v1"),
  securityHandlers: {
    ApiKeyAuth: function (req: any, _scopes: any, _definition: any) {
      console.log(req.headers);
      if (req.headers["x-api-key"] != "biediekey") {
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

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
