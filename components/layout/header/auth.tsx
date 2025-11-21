import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";


export default function Auth(){
    return(
       <div>
        <Link 
        key="Account"
        href="/"
        className="m-10 flex justify-center gap-5">
            <UserCircleIcon className="w-8"/>
            <p className="mt-1">LogIn</p>
        </Link>
       </div>
    )
}