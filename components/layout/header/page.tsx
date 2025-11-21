

import Navbar from "./navbar/navbar";
import Search from "./search";
import Logo from "@/components/logo";
import Auth from "./auth";
import MobileHeader from "./mobileHeader";

import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page(){

    return(
        <div className="w-screen">
            <MobileHeader/>
            <div className=" hidden md:visible md:flex md:flex-row md:justify-between border-b border-neutral-700">
                <Logo/>
                <Navbar/>
                <Search/>
                <Link href='/' className="w-10 mt-10"><ShoppingCartIcon /></Link>
                <Auth/>
            </div>
        </div>
        
    )
}