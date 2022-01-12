import express, { Router, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";

const router: Router = express.Router();

router.get("/transactions", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`);
  res.send(await response.json());
});

router.get("/transactions/:transactionId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`);
  res.send(await response.json());
});

router.post("/transaction", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
});

router.put("/transaction/update", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
});

router.delete("/admin/transaction/:transactionId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"delete",
  });
  res.send(await response.json());
});
export default router;
