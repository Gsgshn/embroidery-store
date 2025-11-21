'use client';

import Link from "next/link";
import {  usePathname } from "next/navigation";
import clsx from 'clsx';

const links = [
    {name: 'Store', href: '/store'},
    {name:'Home', href: '/'}
]

export default function NavLink(){
const pathname = usePathname();
    return(
        <>
        {links.map((link) =>{
            return(
                <Link 
                key={link.name}
                href={link.href}
                className={clsx("flex my-5 grow items-center justify-center rounded-md  text-sm font-bold  ",
                    "  text-gray-500  hover:text-gray-100 hover:outline ", 
                    "md:flex md:flex-display md:justify-center md:p-2 md:px-3 ",
              {
                ' text-white': pathname === link.href,
              },
            )}>
                {link.name}
                </Link>
            )
            
        })}
        </>
    )
}