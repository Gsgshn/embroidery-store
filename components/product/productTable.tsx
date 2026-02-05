import { fetchFilteredProducts, fetchProductList } from "@/lib/data";
import ProductCard from "./productCard";
import Search from "../layout/header/search";




export default async function ProductTable({
    query,
    currentPage,
}:{
    query: string;
    currentPage: number;
}){

    
    const products = await fetchProductList();
    const productsSearch = await fetchFilteredProducts(query, currentPage);
    const hasSearchProduct = productsSearch.length <0;

    return(
        <div>
            {hasSearchProduct ? (
                <div className="h-full p-5  mx-10 flex md:grid md:grid-cols-3 xl:grid xl:grid-cols-4  flex-col    gap-4  bg-neutral-800 rounded-4xl">
                
                    {products.map((product)=>{
                        
                        return(
                            <div className="max-w-xs" key={product.id}>
                                <ProductCard id={product.id}
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
            ) : (
                <div className="flex flex-col  bg-neutral-800 rounded-4xl">
                    <Search/>
                    <div className="h-full p-5  mx-10 mt-10 flex md:grid md:grid-cols-3 xl:grid xl:grid-cols-4  flex-col    gap-4">
                    {productsSearch.map((productsSearch) => {
                        return(
                            <div className="max-w-xs" key={productsSearch.id}>
                                <ProductCard id={productsSearch.id}
                                name={productsSearch.name} 
                                quantity={productsSearch.quantity} 
                                size={productsSearch.size} 
                                price={productsSearch.price}
                                category={productsSearch.category}
                                image_url={productsSearch.image_url} />
                            </div>
                        )
                    
                    })}
                    </div>
                </div>
            )}
        </div>
        
               
                

        
    )
}