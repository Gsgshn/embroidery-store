import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';


export default function Search(){

    return(
        <div className="relative flex  w-full justify-center mt-5 ">
            <label htmlFor="search" className="sr-only"> Search</label>
            <input className="peer block w-[80%] md:w-full  xl:w-[60%] h-[40%] rounded-md  focus:outline-neutral-400  pl-10 text-sm outline-1 outline-neutral-600 placeholder:text-gray-500 m-6"
            placeholder="Search"
            />
            <MagnifyingGlassIcon className="  absolute ms-70 my-[28] md:ms-155 md:my-[34] xl:ms-200  w-5 text-gray-500  peer-focus:text-gray-300" />
        </div>
)
}