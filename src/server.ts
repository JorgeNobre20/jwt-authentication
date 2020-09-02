import express from "express";
import cors from "cors";

import Routes from "./routes";

const app = express();

app.use(express.json());
app.use(Routes);
app.use(cors());

app.listen(3333, () => console.log("Server is running..."));