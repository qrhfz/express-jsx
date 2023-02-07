import { HomePage } from "./HomePage";
import { renderJSX } from "./framework/renderJSX";
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
