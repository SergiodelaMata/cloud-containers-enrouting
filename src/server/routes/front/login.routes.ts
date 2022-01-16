import express, { Router, Request, Response } from "express";
import fetch from "node-fetch";
import {Ports} from "../../server.ports";
import {GetUser} from "../../../interfaces/user.interface"
import {GetHome} from "../../../interfaces/home.interface"

const router: Router = express.Router();

router.post("/login", async(req: Request, res: Response) => {
    const response = await fetch(`http://localhost:${Ports.Users}/user/email/${req.body.email}`);
    const userData = await response.json();
    const formattedResponse: GetUser = JSON.parse(JSON.stringify(userData));
    var status : GetHome ;
    if(req.body.email == formattedResponse.userData.email && req.body.password == formattedResponse.userData.password)
    {
        const redisData = {
            email : req.body.email,
            userId : formattedResponse.userData.userId,
            rol : formattedResponse.userData.rol
        }
        await fetch(`http://localhost:${Ports.RedisLogin}/login`, {
            method:"post",
            body: JSON.stringify(redisData),
            headers: {"Content-Type": "application/json"},
        });
        status = {
            logged : true,
            userId : formattedResponse.userData.userId,
            rol : formattedResponse.userData.rol
        };
        
    }
    else
    {
        console.log("No se han coincidido los datos del usuario o el usuario no se encuentra registrado.")
        status = {
            logged : false,
            userId : null,
            rol : null
        };
    }
    res.send(status);
  });

router.post("/checkLogged", async(req: Request, res: Response) => {
    const responseRedisConn = await fetch(`http://localhost:${Ports.RedisLogin}/logged/${req.body.email}`);
    const logged = await responseRedisConn.json();
    var checkResponse = JSON.parse(JSON.stringify(logged));
    console.log(checkResponse);
    var formattedResponse: GetHome;
    if(checkResponse.status == "empty")
    {
        formattedResponse = {
            logged : false,
            userId : null,
            rol : null
        }
    }
    else
    {
        formattedResponse = JSON.parse(JSON.stringify(logged));
        formattedResponse.logged = true;
    }

    res.send(formattedResponse);
  });

  router.delete("/logout/:email", async(req: Request, res: Response) => {
    const responseRedisConn = await fetch(`http://localhost:${Ports.RedisLogin + req.url}`, {
        method:"delete",
    });
    res.send(await responseRedisConn.json());
  });

export default router;