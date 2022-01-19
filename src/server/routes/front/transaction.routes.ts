import express, { Router, Request, Response } from "express";
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

router.post("/transaction/comprar", async(req: Request, res: Response) => {
  var response = null;

  const responseProduct = await fetch(`http://localhost:${Ports.Products}/product/quantity/update`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json"},
  });
  const responseStatusProduct = await responseProduct.json();
  const formattedResponseProduct = JSON.parse(JSON.stringify(responseStatusProduct));
  if(formattedResponseProduct.status &&formattedResponseProduct.status == "Updated")
  {
    const responseTransaction = await fetch(`http://localhost:${Ports.Transactions}/transaction`, {
      method:"post",
      body: JSON.stringify(req.body),
      headers: {"Content-Type": "application/json"},
    });
    const responseStatusTransaction = await responseTransaction.json();
    const formattedResponseTransaction = JSON.parse(JSON.stringify(responseStatusTransaction));
    if(formattedResponseTransaction.status && formattedResponseTransaction.status == "Saved")
    {
      response = {statusBuy:"Buy"};
    }
    else
    {
      const quantitySelected: number = + req.body.quantitySelected;
      const quantity : number = + req.body.quantity + quantitySelected;
      req.body.quantity = quantity;
      await fetch(`http://localhost:${Ports.Products}/product/quantity/update`, {
        method:"put",
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json"},
      });
      response = {statusBuy:"Error with transaction"};
    }
    
  }
  else
  {
    response = {statusBuy:"Error with transaction"};
  }
  res.send(response);
});

router.post("/transaction/vender", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions}/transaction`, {
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
