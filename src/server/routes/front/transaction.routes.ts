import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";

const router: Router = express.Router();

router.get("/transactions", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"get",
    headers:{"X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/transactions/:transactionId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"get",
    headers:{"X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/transactions/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"get",
    headers:{"X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  console.log(response);
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.post("/transaction/comprar", async(req: Request, res: Response) => {
  var response = null;

  const responseProduct = await fetch(`http://localhost:${Ports.Products}/product/quantity/update`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  const responseStatusProduct = await responseProduct.json();
  const formattedResponseProduct = JSON.parse(JSON.stringify(responseStatusProduct));
  if(formattedResponseProduct.status &&formattedResponseProduct.status == "Updated")
  {
    const responseTransaction = await fetch(`http://localhost:${Ports.Transactions}/transaction`, {
      method:"post",
      body: JSON.stringify(req.body),
      headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
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
        headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"product"},
      });
      response = {statusBuy:"Error with transaction"};
    }
    
  }
  else
  {
    response = {statusBuy:"Error with transaction"};
  }
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(response);
});

router.post("/transaction/vender", async(req: Request, res: Response) => {
  var responseStatus = null;
  var status;
  var statusResponseProduct;
  var quantitySelected: number = + req.body.quantity;
  var quantity: number = 0;
  if(req.body.productId == "0")//Nuevo producto
  {
    //Se introduce primero el producto
    const responseProduct = await fetch(`http://localhost:${Ports.Products}/product`, {
      method:"post",
      body: JSON.stringify(req.body),
      headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"product"},
    });
    statusResponseProduct = await responseProduct.json();
    req.body.productId = statusResponseProduct.productId;
  }
  else
  {
    //Se actualiza el campo de la cantidad del producto
    quantity = +req.body.actualQuantity;
    quantity += quantitySelected;
    req.body.quantity = quantity;
    const responseProduct = await fetch(`http://localhost:${Ports.Products}/product/update`, {
      method:"put",
      body: JSON.stringify(req.body),
      headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"product"},
    });
    statusResponseProduct = await responseProduct.json();
  }
  if(statusResponseProduct.status == "Saved" || statusResponseProduct.status == "Updated")
  {
    req.body.quantitySelected = quantitySelected;
    req.body.typetransaction = "Vender";
    req.body.datetransaction = new Date();
    const response = await fetch(`http://localhost:${Ports.Transactions}/transaction`, {
      method:"post",
      body: JSON.stringify(req.body),
      headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
    });
    status = await response.json();
    const formattedResponseStatus = JSON.parse(JSON.stringify(status));
    if(formattedResponseStatus.status && formattedResponseStatus.status == "Saved")
    {
      responseStatus = {statusSell:"Sell"};
    }
    else
    {
      responseStatus = {statusSell:"Error with transaction"};
    }
  }
  else
  {
    responseStatus = {statusSell:"Error with transaction"};
  }
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(responseStatus);
});

router.put("/transaction/update", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.delete("/admin/transaction/:transactionId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"delete",
    headers: {"X-version":"1", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","1");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});
export default router;
