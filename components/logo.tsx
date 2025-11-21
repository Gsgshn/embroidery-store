import Image from "next/image";
import Link from "next/link";

export default function Logo(){
    return(
        <Link
        href={"/"}
        className="md:m-8 ">
            <Image 
                src='https://i.pinimg.com/1200x/5d/f6/57/5df657343a4f46bb3a099dde7c5d6b8a.jpg' 
                alt={""}
                width={50}
                height={50} 
                className="rounded-full w-10 md:w-20 "/>
         </Link>
    )
}