import ProductCard from "@/components/product/productCard"
import ProductTable from "@/components/product/productTable"
import { fetchProductList } from "@/lib/data"
import CategoryList from "@/components/ui/categoryList";


export default async function Page(props:{
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}){
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    

    return(
        <div className="h-full flex md:flex-row flex-col gap-5  md:mx-20 mt-5">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <CategoryList/>
            <ProductTable query={query} currentPage={currentPage}/>
            
        </div>
    )
}