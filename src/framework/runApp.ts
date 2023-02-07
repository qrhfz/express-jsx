import cluster from "cluster";
import os from "os";
import path from "path";
import Express from "express";

export function runApp(
  callback: (express: Express.Express) => void,
  { port }: { port: number },
) {
  if (cluster.isPrimary) {
    const totalCpus = os.cpus().length;

    for (let i = 0; i < totalCpus; i++) {
      cluster.fork();
    }

    console.log(`http://localhost:${port}`);

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
      console.log("Let's fork another worker!");
      cluster.fork();
    });
  } else {
    const express = Express();

    express.use(
      "/static",
      Express.static(path.join(__dirname, "..", "static")),
    );
    express.use("/public", Express.static("./public"));

    callback(express);

    express.listen(port);
  }
}
