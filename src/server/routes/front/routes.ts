import express, { Router } from "express";

const router: Router = express.Router();

router.get("/movies", (req, res) => {
  res.status(200).send(
    [{ ok: true }, { ok: true }, { ok: true }]
  );
});

router.get("/movies/:movie", (req, res) => {
  res.status(200).send(
    { ok: req.params.movie }
  );
});

router.post("/movie", (req, res) => {
  res.status(200).send(
    req.body
  );
});

router.put("/movie/:movie", (req, res) => {
  res.status(200).send(
    {body: req.body, id: req.params.movie}
  );
});


export default router;
