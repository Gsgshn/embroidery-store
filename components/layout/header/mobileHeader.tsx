'use client';

import { useState } from "react";
import { Bars3Icon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Logo from "@/components/logo";
import Link from "next/link";

import Search from "./search";



export default function MobileHeader(){

    const [ isOpen, setOpen] = useState<boolean>();

    return(
        <div className=" flex justify-between mt-2  md:hidden">
            <div className=" flex flex-col w-full ">
                <div className="flex justify-between items-center mx-5">
                    <button onClick={() => setOpen(!isOpen)} className=" relative w-[8%] ms-5 "><Bars3Icon/></button>
                    <span className="flex flex-col items-center font-bold">Embroidery store </span><Logo/>
                    <Link href='/' className="w-10 mt-3"><ShoppingCartIcon /></Link>
                </div>
                
                <div className={`flex flex-col  items-start fixed bg-neutral-900  w-screen h-full bottom-0 left-0 top-0 right-0  inset-0 ${isOpen? "" : "hidden"}`}>
                    <button onClick={() => setOpen(!isOpen)} className="w-[8%] mt-5 ms-10"><Bars3Icon/></button>
                    <Search/>
                    <nav className={`flex flex-col ms-10 `}>
                        
                        <Link onClick={() => setOpen(!isOpen)} href={'/store'} className="font-solid text-xl mt-5">Store</Link>
                        <Link onClick={() => setOpen(!isOpen)} href={'/product'} className="font-solid text-xl mt-5">Product</Link>
                        <Link onClick={() => setOpen(!isOpen)} href={'/'} className="font-solid text-xl mt-5">Home</Link>

                    </nav>
                </div>
                 
            
            </div>
           
        </div>
    )
}