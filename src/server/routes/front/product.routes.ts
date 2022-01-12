import express, { Router, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";

const router: Router = express.Router();

router.get("/products", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`);
  res.send(await response.json());
});

router.get("/products/:productId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`);
  res.send(await response.json());
});

router.post("/product", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
});

router.put("/product/update", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  res.send(await response.json());
});

router.delete("/admin/product/:productId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"delete",
  });
  res.send(await response.json());
});

export default router;
