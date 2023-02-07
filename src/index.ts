import Express from "express";
import cluster from "cluster";
import os from "os";
import { HomePage } from "./HomePage";
import { renderJSX } from "./renderJSX";
import path from "path";

if (cluster.isPrimary) {
  const totalCpus = os.cpus().length;

  for (let i = 0; i < totalCpus; i++) {
    cluster.fork();
  }

  console.log("http://localhost:8080");

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
} else {
  const express = Express();

  const pubdir = path.join(__dirname, "public");
  express.use("/public", Express.static(pubdir));

  express.get("/", async (req, res, next) => {
    renderJSX(
      res,
      HomePage,
      {
        props: {},
        title: "Kucingk",
      },
    );
  });

  express.listen(8080);
}
