import { ShoppingCartIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export default function ShoppingIcons(){
    return(
         <Link href='/cart' className="w-10 mt-10"
                ><ShoppingCartIcon /></Link>
    )
}