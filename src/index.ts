import { runApp } from "./framework/runApp";
import router from "./router";

runApp({
  router: router,
  port: process.env.PORT || 8080,
  clustering: process.env.CLUSTERING === "true" || false,
});
