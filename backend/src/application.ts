import * as express from "express";
import { pingController } from "./controllers/ping";

require('dotenv').config()

const app = express();

app.use(pingController);

export default app;
