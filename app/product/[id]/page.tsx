import ProductCard from '@/components/product/productCard';
import { fetchProductList, fetchProduct } from '@/lib/data';
import AddToCartButton from '@/components/ui/addToCartButton';



const sizes = [
    {size:'S',quantity: '2'},
    {size:'M',quantity: '4'},
    {size:'L',quantity: '7'},
    {size:'XL',quantity: '3'},
    {size:'XXL',quantity: '9+'},
];

export default async function Page({params}){

    const paramsData = await params;
    console.log(paramsData);
    const dataProduct = await fetchProduct(paramsData.id);
    const products = await fetchProductList();

    return(
        <div className="h-full mx-5 flex flex-col gap-5  md:mx-40   mt-5  ">
            <div className="flex  md:flex-row flex-col w-full h-full bg-neutral-900 rounded-4xl ">
                <img 
                    src={dataProduct[0].image_url}
                    className='flex rounded-4xl w-full ' />
                    <div className='flex flex-col  md:w-full h-full m-10'>
                        <h1 className='font-bold text-3xl md:text-5xl  '>{dataProduct[0].name}</h1>
                        <h2 className=' md:text-4xl text-xl mt-5'>{dataProduct[0].price} рубленых</h2>
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
                        
                        <AddToCartButton product={dataProduct[0]}/>
                            <h1 className='font-bold  md:text-3xl text-xl'>{dataProduct[0].category}</h1>
                    </div>
                    
            </div>
            <h1 className='font-bold mx-auto text-5xl'>Покупайте!!!</h1>
            <div className="flex flex-col mx-10 md:grid md:grid-cols-3 xl:grid xl:grid-cols-4 gap-5 md:bg-neutral-900 rounded-4xl  ">
                
                {products.map((product)=>{
                                    return(
                                        <div key={product.id} className='max-w-xs'>
                                            <ProductCard 
                                            key={product.id}
                                            id={product.id}
                                            name={product.name} 
                                            quantity={product.quantity} 
                                            size={product.size} 
                                            price={product.price}
                                            category={product.category}
                                            image_url={product.image_url} />
                                        </div>
                                        
                                    )
                                })}
                
            </div>
        </div>
    )
}