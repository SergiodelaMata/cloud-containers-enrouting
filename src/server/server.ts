import express, { json } from "express";
import product_router from "./routes/front/product.routes";
import transaction_router from "./routes/front/transaction.routes";
import user_router from "./routes/front/user.routes";
import login_router from "./routes/front/login.routes";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(json());

app.use(morgan("tiny"));

app.use(product_router);
app.use(transaction_router);
app.use(user_router);
app.use(login_router);

export default app;
