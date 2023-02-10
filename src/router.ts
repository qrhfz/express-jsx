import { Router } from "express";

const router = Router();

router.get("/", async (req, res, next) => {
  res.render("HomePage", { title: "hello" });
});

router.get("/cat", (req, res) => res.send("meow"));

export default router;
