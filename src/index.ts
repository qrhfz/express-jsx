import { runApp } from "./framework/runApp";

runApp(
  (express) => {
    express.get("/", async (req, res, next) => {
      res.render("HomePage", { title: "hello" });
    });
  },
  { port: 8080 }
);
