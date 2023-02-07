import Express from "express";
import cluster from "cluster";
import os from "os";
import { HomePage } from "./HomePage";
import { renderJSX } from "./framework/renderJSX";
import path from "path";
import { runApp } from "./framework/runApp";

runApp((express) => {
  express.get("/", async (req, res, next) => {
    renderJSX(
      res,
      HomePage,
      {
        props: {},
        title: "My Home Page",
      },
    );
  });
}, { port: 8080 });
