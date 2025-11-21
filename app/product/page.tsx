import Image from 'next/image';
import ProductCard from '@/components/product/productCard';


const sizes = [
    {size:'S',quantity: '2'},
    {size:'M',quantity: '4'},
    {size:'L',quantity: '7'},
    {size:'XL',quantity: '3'},
    {size:'XXL',quantity: '9+'},
];

export default function Page(){
    return(
        <div className="h-full mx-5 flex flex-col gap-5  md:mx-40   mt-5  ">
            <div className="flex  md:flex-row flex-col w-full h-full bg-neutral-900 rounded-4xl ">
                <Image 
                    src='https://torch-fff.com/upload/iblock/3a7/3a7ba28335d9786587eb951f48d54397.jpg'
                    width={1872}
                    height={2340}
                    alt={''}
                    className='flex rounded-4xl w-full ' />
                    <div className='flex flex-col  md:w-full h-full m-10'>
                        <h1 className='font-bold text-3xl md:text-5xl  xl:text-gray-800'>YummYumm</h1>
                        <h2 className=' md:text-4xl text-xl mt-5'>2800 рубленых</h2>
                        <div className='flex flex-row '>
                            <h1 className='mt-10 md:text-3xl text-xl'>Размер:</h1>
                            <div className='flex flex-row w-full gap-3'>
                            {sizes.map((sizes)=>{
                                return(
                                        <button key={sizes.size} type='button' className='w-[10%] focus:outline-white hover:outline-gray-400 my-10 outline outline-0.5 outline-gray-600 md:text-2xl  text-white rounded-full'>
                                            {sizes.size}
                                        </button>
                                )
                            })}
                            </div>
                            
                        </div>
                        <button className='w-1/2 hover:outline-gray-400 my-10 outline outline-0.5 outline-gray-600 md:text-2xl text-xl text-white rounded-full'>Add to Cart</button>
                            <h1 className='font-bold  md:text-3xl text-xl'>YummYumm: описание</h1>
                    </div>
                    
            </div>
            <h1 className='font-bold mx-auto text-5xl'>Покупайте!!!</h1>
            <div className="flex flex-col mx-10 md:flex-row gap-5 md:bg-neutral-900 rounded-4xl ">
                
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                <ProductCard/>
                
            </div>
        </div>
    )
}