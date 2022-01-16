export interface GetTransactions {
  transactionData: TransactionData[] | TransactionData;
  logged: boolean;
  userId: string;
  rol: string;
  
}

export interface GetTransaction {
  transactionData: TransactionData;
  logged: boolean;
  userId: string;
  rol: string;
  
}

export interface TransactionData {
  transactionId: string;
  quantity: number;
  typetransaction: string;
  datetransaction: Date;
  productId: string;
  userId: string;
}
