import { Application, Request, Response, NextFunction } from "express";

const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.ts");
const app: Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');

  // authorized headers for preflight requests
  // https://developer.mozilla.org/en-US/docs/Glossary/preflight_request
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();

  app.options('*', (req: Request, res: Response) => {
    // allowed XHR methods  
    res.header('Access-Control-Allow-Methods', 'GET, PATCH, PUT, POST, DELETE, OPTIONS');
    res.send();
  });
});

routes(app);

app.listen(3001, () => console.log(`app listening on port ${3001}`));
