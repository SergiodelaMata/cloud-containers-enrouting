import {Long} from "typeorm";
export interface Transaction {
  transactionId: string;
  quantity: Long;
  description: string;
  image: string;

}
