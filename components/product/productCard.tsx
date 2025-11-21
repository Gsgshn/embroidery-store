import Image from "next/image"
import Link from "next/link"


export default function ProductCard(){

    return(
        <div className=" flex flex-row  w-auto bg-neutral-800 rounded-4xl ">
            <Link
                href='/product'>
                 <Image 
                    src='https://torch-fff.com/upload/iblock/3a7/3a7ba28335d9786587eb951f48d54397.jpg'
                    width={1872}
                    height={2340}
                    alt={''}
                    className='rounded-4xl w-full' />
                <h1 className='font-bold m-2 text-3xl'>YummYumm</h1>
                <h2 className='mx-2 mb-2 text-2xl'>2800 рубленых</h2>
            </Link>
           
        </div>
    )
}