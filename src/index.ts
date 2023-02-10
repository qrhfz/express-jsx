import { runApp } from "./framework/runApp";

runApp(
  (express) => {
    express.get("/", async (req, res, next) => {
      res.render("HomePage", { title: "hello" });
    });

    express.get("/cat", (req, res) => res.send("meow"));
  },
  { port: 8080 }
);
