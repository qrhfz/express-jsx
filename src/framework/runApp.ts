import cluster from "cluster";
import os from "os";
import path from "path";
import Express from "express";
import { jsxViewEngine } from "./jsx-view-engine";
import compression from "compression";
import morgan from "morgan";
import bodyParser from "body-parser";

export function runApp(
  { port, clustering }: { port: number | string; clustering: boolean },
  callback: (express: Express.Express) => void
) {
  if (clustering && cluster.isPrimary) {
    startWorkers();
  } else {
    const express = createExpress();
    callback(express);
    express.listen(port);
  }
}

function createExpress() {
  const express = Express();

  express.use(morgan("common"));
  express.use(compression());

  express.use(bodyParser.urlencoded({ extended: false }));
  express.use(bodyParser.json());

  express.use("/static", Express.static(path.join(__dirname, "..", "static")));
  express.use("/public", Express.static("./public"));

  express.engine("js", jsxViewEngine);
  express.set("views", path.resolve(__dirname, "..", "views"));
  express.set("view engine", "js");

  return express;
}

function startWorkers() {
  const totalCpus = os.cpus().length;

  for (let i = 0; i < totalCpus; i++) {
    console.log(`create worker ${i}`);
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log("Let's fork another worker!");
    cluster.fork();
  });
}
