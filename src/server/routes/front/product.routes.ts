import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";

const router: Router = express.Router();

router.get("/products", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/products/:productId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/products/productByName/:name", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});


router.post("/product", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"post",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.put("/product/update", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.delete("/admin/product/:productId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Products + req.url}`, {
    method:"delete",
    headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

export default router;
