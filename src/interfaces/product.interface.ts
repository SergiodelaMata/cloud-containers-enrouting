export interface GetProducts {
  productData: ProductData[] | ProductData;
  logged: boolean;
  userId: string;
  rol: string;
  
}

export interface GetProduct {
  productData: ProductData;
  logged: boolean;
  userId: string;
  rol: string;
  
}

export interface ProductData {
  productId: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  platform: string;
  company: string;
}
