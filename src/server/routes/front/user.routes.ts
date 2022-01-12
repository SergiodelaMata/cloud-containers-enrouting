import express, { Router, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";

const router: Router = express.Router();

router.get("/users", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`);
  res.send(await response.json());
});

router.get("/users/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`);
  res.send(await response.json());
});

router.post("/user", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
});

router.put("/user/update", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
});

router.delete("/admin/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
    method:"delete",
  });
  res.send(await response.json());
});
export default router;
