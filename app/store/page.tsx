import ProductCard from "@/components/product/productCard"


export default function Page(){

    return(
        <div className="h-full flex md:flex-row flex-col gap-5  md:mx-20 mt-5">
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <div className="flex flex-col collapse md:visible">
                <h1>Category</h1>
                <h2>All</h2>
                <h2>T-shirt</h2>
                <h2>Hudi</h2>
                <h2></h2>
            </div>
            <div className="h-full  mx-10 flex md:grid md:grid-cols-3 xl:grid xl:grid-cols-4  flex-col    gap-4 ">
                <div className="max-w-xs"><ProductCard/></div>
                <div className="max-w-xs"><ProductCard/></div>
                <div className="max-w-xs"><ProductCard/></div>
                <div className="max-w-xs"><ProductCard/></div>
                <div className="max-w-xs"><ProductCard/></div>
                <div className="max-w-xs"><ProductCard/></div>
                

            </div>
            <div className="flex flex-col collapse md:visible">
                <h1>Category</h1>
                <h2>All</h2>
                <h2>T-shirt</h2>
                <h2>Hudi</h2>
                <h2></h2>
            </div>
        </div>
    )
}