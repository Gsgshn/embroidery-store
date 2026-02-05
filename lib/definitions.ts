export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  name: string;
  quantity: number;
  size: string;
  price: number;
  category: string;
  image_url: string;
}

export type Order ={
  id: string;
  user_id: string;
  
  items: OrderItem[];
}

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
}

