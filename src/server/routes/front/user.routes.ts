import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";
import {GetUser} from "../../../interfaces/user.interface"

const router: Router = express.Router();

router.get("/users", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`,{
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.get("/user/findByEmail/:email", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users}/user/email/${req.params.email}`,{
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});


router.get("/users/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`,{
    method:"get",
    headers:{"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});

router.post("/user", async(req: Request, res: Response) => {
  var status;
  if(req.body.password == req.body.verifypassword && req.body.password != "")
  {
    const userData = {
      name : req.body.name,
      firstsurname : req.body.firstsurname,
      secondsurname : req.body.secondsurname,
      password : req.body.password,
      telephone : req.body.telephone,
      email : req.body.email,
      rol : "user"
    }
    const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
      method:"post",
      body: JSON.stringify(userData),
      headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
    });
    status = await response.json();
  }
  else
  {
    status = {status: "Password different"};
  }
  
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(status);
});

router.put("/user/update", async(req: Request, res: Response) => {
  var status;
  if(req.body.password == "" || req.body.newpassword == "" || req.body.verifypassword == "")
  {
    req.body.password = req.body.currentpassword; //Se mantiene la contraseña que había antes
    const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
        method:"put",
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
      });
      status = await response.json();
  }
  else
  {
    if(req.body.currentpassword == req.body.password && req.body.currentpassword != req.body.newpassword 
      && req.body.currentpassword != req.body.verifypassword && req.body.newpassword == req.body.verifypassword)
    {
      req.body.password = req.body.newpassword; //Se actualiza el campo de la contraseña para facilitar la búsqueda de la contraseña por parte del microservicio
      const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
        method:"put",
        body: JSON.stringify(req.body),
        headers: {"Content-Type": "application/json", "X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
      });
      status = await response.json();
    }
    else
    {
      status = {status : "Password different"};
    }
  }
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(status);
});

router.delete("/admin/user/:userId", async(req: Request, res: Response) => {
  const response = await fetch(`http://localhost:${Ports.Users + req.url}`, {
    method:"delete",
    headers: {"X-version":"2", "X-sender-service":"enrouting", "X-destination-service":"user"},
  });
  res.header("Content-Type", "application/json");
  res.header("X-version","2");
  res.header("X-sender","enrouting");
  res.header("X-destination","app");
  res.send(await response.json());
});
export default router;
