"use client";
import { useState } from "react";
import { Product } from "@/lib/definitions";
import { useSession } from "next-auth/react";
import { useCart } from "../providers/CartProvider";

type ProductType = {
  id: string;
  
}


export default function AddToCartButton({ product } : {product: ProductType}) {
  const [loading, setLoading] = useState(false);
  
  const {data: session, status} = useSession();
  const [showPopup, setShowPopup] = useState(false);
  const {cart, setCart} = useCart();
      
  
      function handleClick(e: React.MouseEvent<HTMLButtonElement>){
          e.preventDefault();
          if(status != "authenticated"){
              setShowPopup(true)
              setTimeout(()=>{
                  setShowPopup(false);
              },3000);
          }else{ addToCart()}
      }

  const addToCart = async () => {
    setLoading(true);
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId: product.id, quantity: 1 }),
    });
    setCart((cart) => !cart);
    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-1/2 hover:outline-gray-400 my-10 outline outline-0.5 outline-gray-600 md:text-2xl text-xl text-white rounded-full"
    >
      {loading ? "Add..." : "Add to cart"}
      {showPopup && (
                     <div className="fixed top-125 right-80 bg-neutral-800 text-white px-6 py-3 rounded-2xl shadow-lg z-50">
                        Для добавления заказа в корзину сначала авторизуйтесь
                    </div>
                )}
    </button>
  );
}
