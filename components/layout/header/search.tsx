'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


export default function Search(){

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((term: string) =>{
        const params = new URLSearchParams(searchParams);
        if (term){
            params.set('query', term);
        }else{
            params.delete('query');
        }
        console.log(term)
        replace(`${pathname}?${params.toString()}`);
    }, 300)

    return(
        <div className="relative flex  w-full h-10 justify-center mt-5 ">
            <label htmlFor="search" className="sr-only"> Search</label>
            <input className="peer block w-full  h-full rounded-4xl  focus:outline-neutral-400  pl-10 text-sm outline-1 outline-neutral-600 placeholder:text-gray-500 m-6"
            placeholder="Search"
            onChange={(e) => {
                handleSearch(e.target.value)
            }}
            defaultValue={searchParams.get('query')?.toString()}
            />
            <MagnifyingGlassIcon className="  absolute right-10 my-[34] xl:ml-auto  w-5 text-gray-500  peer-focus:text-gray-300" />
        </div>
)
}