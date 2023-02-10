import { runApp } from "./framework/runApp";

runApp(
  {
    port: process.env.PORT || 8080,
    clustering: process.env.CLUSTERING === "true" || false,
  },
  (express) => {
    express.get("/", async (req, res, next) => {
      res.render("HomePage", { title: "hello" });
    });

    express.get("/cat", (req, res) => res.send("meow"));
  }
);
