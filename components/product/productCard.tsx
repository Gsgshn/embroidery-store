
import Link from "next/link"
import { Product } from "@/lib/definitions"


export default function ProductCard(product: Product){

    return(
        <div className=" flex flex-row  w-auto bg-neutral-800 rounded-4xl ">
            <Link
                href={`/product/${product.id}`}>
                 <img 
                    src={product.image_url}
                    className='rounded-4xl w-full' />
                <h1 className='font-bold m-2 text-3xl'>{product.name}</h1>
                <h2 className='mx-2 mb-2 text-2xl'>{product.price} рубленых</h2>
            </Link>
           
        </div>
    )
}