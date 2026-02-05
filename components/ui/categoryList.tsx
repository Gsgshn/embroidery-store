'use client'

import { useSearchParams, useRouter,usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react";

export default function CategoryList(){

    const [open, setOpen] = useState(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const ref = useRef(null); 
    const {replace} = useRouter();
     const categories = ["T-shirt", "Shirt", "Hoody", "Sweater","Jersey","Scarf"];

     useEffect(()=>{
        const handleClickOutside = (event) =>{
            if (ref.current && !ref.current.contains(event.target)){
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
     },[])

     function handleClick(term: React.MouseEvent<HTMLDivElement>){
        const params = new URLSearchParams(searchParams);
        if (term){
            params.set('query', term.currentTarget.textContent);
        }else{
            params.delete('query');
        }
        console.log(term)
        replace(`${pathname}?${params.toString()}`);
    }

    return(
        <>
        <div className="hidden md:block">
            <h1 className="text-2xl">Collection</h1>
            <h1 className="ms-2 text-xl hover:outline-1 outline-neutral-600 rounded-4xl px-2 cursor-default" onClick={handleClick}>T-shirt</h1>
            <h1 className="ms-2 text-xl hover:outline-1 outline-neutral-600 rounded-4xl px-2 cursor-default" onClick={handleClick}>Shirt</h1>
            <h1 className="ms-2 text-xl hover:outline-1 outline-neutral-600 rounded-4xl px-2 cursor-default" onClick={handleClick}>Hoody</h1>
            <h1 className="ms-2 text-xl hover:outline-1 outline-neutral-600 rounded-4xl px-2 cursor-default" onClick={handleClick}>Sweater</h1>
            <h1 className="ms-2 text-xl hover:outline-1 outline-neutral-600 rounded-4xl px-2 cursor-default" onClick={handleClick}>Jersey</h1>
            <h1 className="ms-2 text-xl hover:outline-1 outline-neutral-600 rounded-4xl px-2 cursor-default" onClick={handleClick}>Scarf</h1>
            
        </div>
        
        <div ref={ref} className="relative inline-block  text-center md:hidden">
        {/* Кнопка */}
        <button
            onClick={() => setOpen(!open)}
            className="inline-flex justify-center w-[80%] rounded-md outline-1 outline-neutral-700 bg-neutral-800 px-4 py-2 text-lg font-bold   "
        >
            Collections
        
        </button>

        {/* Выпадающий список */}
        {open && (
            <div className="absolute left-1/10 mt-2 w-[80%] rounded-md shadow-lg bg-neutral-800 ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1">
                {categories.map((cat) => (
                <p
                    key={cat}
                    onClick={handleClick}
                    className="block px-4 py-2   text-lg"
                >
                    {cat}
                </p>
                ))}
            </div>
            </div>
        )}
        </div>
        </>
    )
    
}