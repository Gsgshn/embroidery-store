"use client";
import AddToOrderButton from "@/components/ui/addToOrderButton";
import { useEffect, useState } from "react";
import  { XMarkIcon } from "@heroicons/react/24/outline";
import { products } from "@/lib/placeholder-data";
import { useCart } from "@/components/providers/CartProvider";


type CartItem = {
  product_id: string;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const {cart, setCart} = useCart();

  async function fetchCart() {
    const res = await fetch("/api/cart");
    if (res.ok) {
      const data = await res.json();
      
      setItems(data);
    }
  }

  useEffect(() => {
  async function loadCart() {
    await fetchCart();
  }
  loadCart();
}, []);


  async function increaseQuantity(productId: string) {
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action: "increase" }),
    });
    fetchCart();
  }

  async function decreaseQuantity(productId: string) {
    await fetch("/api/cart", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, action: "decrease" }),
    });
    fetchCart();
  }

  async function removeItem(productId: string) {
    
    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
    setCart((cart) => !cart)
    fetchCart();
  }

  

  return (
    <div className="rounded-4xl bg-neutral-800 w-screen flex flex-col md:ms-15 mt-10 items-center md:mx-40 xl:w-[80%] xl:ms-50">
      <h1 className="my-5 xl:text-5xl md:text-5xl">My cart</h1>
      <div className="flex flex-col md:flex-row p-4 w-full">
        
        <ul className="w-full md:w-[90%] flex flex-col justify-between">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-neutral-900 rounded-4xl my-3 p-5 flex flex-col md:flex-row xl:text-2xl"
            >
              <img
                src={item.image_url}
                className="rounded-4xl md:max-w-[20%]"
                alt={item.name}
              />
              <div className=" p-4 flex flex-row md:flex-col justify-between  md:mx-5 md:w-[18%] xl:w-[13%]">
                <p className="text-3xl">{item.name}</p>
                <button
                  onClick={() => removeItem(item.product_id)}
                  className="px-2 py-1 outline-1 outline-neutral-700 text-neutral-500 rounded flex flex-row w-[40%]"
                >
                <XMarkIcon className="w-[17%]"/> <span className="text-lg">Delete</span>
                </button>
              </div>
              <div className="flex flex-row md:flex-col justify-between  p-4 md:ml-auto">
                  <p className="text-2xl"> {Number(item.price) * Number(item.quantity)} руб</p>
                  <div className="flex flex-row outline-1 outline-neutral-700 rounded p-2 w-33 md:w-50  text-content-center justify-between md:ml-auto ">
                    <button
                    onClick={() => decreaseQuantity(item.product_id)}
                    className=" "
                    >
                      -
                    </button>
                    <p>{item.quantity}</p>
                    <button
                      onClick={() => increaseQuantity(item.product_id)}
                      className=""
                    >
                      +
                    </button>
                  </div>
                  
              </div>
            </li>
          ))}
          
        </ul>
        <div className="flex flex-col p-4 justify-between rounded-4xl bg-neutral-900 md:ms-5 h-[20%] md:w-[40%]">
          <p className="text-2xl">Total price: {
            items.reduce((sum, product) => sum + Number(product.price) * Number(product.quantity), 0)
          } руб</p>
          
          <AddToOrderButton/>
          
        </div>
      </div>
    </div>
  );
}
{/* <div className="m-5 ">
              
              
              </div>
              
              
            </div>
            <div className="flex  gap-2  border h-[10%]">
             
              
              
            </div> */}