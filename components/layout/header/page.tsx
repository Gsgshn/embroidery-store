'use client'

import Navbar from "./navbar/navbar";
import Search from "./search";
import Logo from "@/components/logo";
import Auth from "./auth";
import MobileHeader from "./mobileHeader";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { ShoppingCartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";

type CartItem = {
  product_id: string;
  name: string;
  image_url: string;
  price: number;
  quantity: number;
};

export default function Page(){

    const {data: session, status} = useSession();
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();
    const [items, setItems] = useState<CartItem[]>([]);
    const totalCountCart = items.length;
    const {cart, setCart} = useCart();
    
    
      async function fetchCart() {
        const res = await fetch("/api/cart");
        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setItems(data);
        }
      }
    
      useEffect(() => {
      async function loadCart() {
        await fetchCart();
      }
      loadCart();
    }, [cart]);

    function handleClick(e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        if(status != "authenticated"){
            setShowPopup(true)
            setTimeout(()=>{
                setShowPopup(false);
            },3000);
        }else{ router.push("/cart")}
    }

    function handleClickOrder(e: React.MouseEvent<HTMLAnchorElement>){
        e.preventDefault();
        if(status != "authenticated"){
            setShowPopup(true)
            setTimeout(()=>{
                setShowPopup(false);
            },3000);
        }else{ router.push("/order")}
    }

    return(
        <div className="w-screen">
            <MobileHeader/>
            <div className=" hidden md:visible md:flex md:flex-row md:justify-between border-b border-neutral-700">
                <Logo/>
                <Navbar/>
                <div className="flex justify-center items-center w-[80%]"><h1 className="text-5xl justify-center items-center">Embroidery Store</h1></div>
                <Link href='/order'className="w-10 mt-10 mx-10"
                onClick={handleClickOrder}><ShoppingBagIcon/></Link>
                <Link href='/cart' className="w-10 mt-10"
                onClick={handleClick}><ShoppingCartIcon /><p className="  absolute -mt-13 ms-5 outline-1 outline-neutral-500  rounded-full w-5 h-5 text-center">{totalCountCart}</p></Link>
                {showPopup && (
                     <div className="fixed top-20 right-4 bg-neutral-800 text-white px-6 py-3 rounded-2xl shadow-lg z-50">
                        Для формирования корзины сначала авторизуйтесь
                    </div>
                )}
                <Auth/>
            </div>
        </div>
        
    )
}