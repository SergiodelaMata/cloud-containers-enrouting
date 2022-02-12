import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";
import { GetProduct } from "../../../interfaces/product.interface";
import { GetTransaction } from "../../../interfaces/transaction.interface";
import {Ports} from "../../server.ports";

const router: Router = express.Router();

router.get("/transactions", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/transactions/:transactionId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/transactions/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.post("/transaction/comprar", async(req: Request, res: Response) => {
  var response = null;

  const responseProduct = await fetch(`http://localhost:${Ports.Products}/product/quantity/update`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
  });
  const responseStatusProduct = await responseProduct.json();
  const formattedResponseProduct = JSON.parse(JSON.stringify(responseStatusProduct));
  if(formattedResponseProduct.status &&formattedResponseProduct.status == "Updated")
  {
    const responseTransaction = await fetch(`http://localhost:${Ports.Transactions}/transaction`, {
      method:"post",
      body: JSON.stringify(req.body),
      headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
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
        headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
      });
      response = {statusBuy:"Error with transaction"};
    }
    
  }
  else
  {
    response = {statusBuy:"Error with transaction"};
  }
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
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
      headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
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
      headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
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
      headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
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
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(responseStatus);
});

router.put("/transaction/update", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
    method:"put",
    body: JSON.stringify(req.body),
    headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.delete("/admin/transaction/:transactionId", async(req: Request, res: Response) => {
  var status = null;
  const responseTransaction = await fetch(`http://localhost:${Ports.Transactions}/transactions/${req.params.transactionId}`, {
    method:"get",
    headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
  });
  const responseTransactionData = await responseTransaction.json();
  const formattedResponseTransaction: GetTransaction = JSON.parse(JSON.stringify(responseTransactionData));
  if(formattedResponseTransaction != undefined && formattedResponseTransaction.transactionData.typetransaction == "Comprar")
  {
    const responseProduct = await fetch(`http://localhost:${Ports.Products}/products/${formattedResponseTransaction.transactionData.productId}`, {
      method:"get",
      headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
    });
    const responseProductData = await responseProduct.json();
    const formattedResponseProduct: GetProduct = JSON.parse(JSON.stringify(responseProductData));
    if(formattedResponseProduct != undefined && formattedResponseProduct.productData != undefined) //El producto no se ha eliminado
    {
      var quantity : number = +formattedResponseProduct.productData.quantity;
      var quantityTransaction : number = +formattedResponseTransaction.transactionData.quantity;
      quantity += quantityTransaction;
      req.body.productId = formattedResponseProduct.productData.productId;
      req.body.quantity = quantity;
      const responseProduct = await fetch(`http://localhost:${Ports.Products}/product/quantity/update`, {
        method:"put",
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
      });
      const statusResponseProduct = await responseProduct.json();
      const formattedStatus = JSON.parse(JSON.stringify(statusResponseProduct));
      if(formattedStatus && formattedStatus.status == "Updated")
      {
        const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
          method:"delete",
          headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
        });
        await response.json();
        status = {status: "cancel"};
      }
      else
      {
        status = {status: "imposible acceptance request"};
      }
    }
    else
    {
      status = {status: "imposible acceptance request"};
    }
  }
  else if (formattedResponseTransaction != undefined && formattedResponseTransaction.transactionData.typetransaction == "Vender")
  {
    const responseProduct = await fetch(`http://localhost:${Ports.Products}/products/${formattedResponseTransaction.transactionData.productId}`, {
      method:"get",
      headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
    });
    const responseProductData = await responseProduct.json();
    const formattedResponseProduct: GetProduct = JSON.parse(JSON.stringify(responseProductData));
    if(formattedResponseProduct != undefined && formattedResponseProduct.productData != undefined &&
      formattedResponseProduct.productData.quantity >= formattedResponseTransaction.transactionData.quantity) 
      //El producto no se ha eliminado y aún se disponen de unidades
    {
      var quantity : number = +formattedResponseProduct.productData.quantity;
      var quantityTransaction : number = +formattedResponseTransaction.transactionData.quantity;
      quantity -= quantityTransaction;
      req.body.productId = formattedResponseProduct.productData.productId;
      req.body.quantity = quantity;
      const responseProduct = await fetch(`http://localhost:${Ports.Products}/product/quantity/update`, {
        method:"put",
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"product"},
      });
      const statusResponseProduct = await responseProduct.json();
      const formattedStatus = JSON.parse(JSON.stringify(statusResponseProduct));
      if(formattedStatus != undefined && formattedStatus.status == "Updated")
      {
        const response = await fetch(`http://localhost:${Ports.Transactions + req.url}`, {
          method:"delete",
          headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"transaction"},
        });
        await response.json();
        status = {status: "cancel"};
      }
      else
      {
        status = {status: "imposible acceptance request"};
      }
    }
    else
    {
      status = {status: "imposible acceptance request"};
    }
  }
  else
  {
    status = {status: "imposible acceptance request"};
  }
  
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(status);
});

export default router;
