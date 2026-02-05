import postgres from "postgres";
import { pool } from "./db";
import { Product } from "./definitions";
import { auth } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchCartItems(){
    try{
        const session = await auth();
        const userId = session?.user?.id;
        const countOfCartItems = await pool.query(
            `SELECT COUNT(*) AS total_items
            FROM cartitems
            WHERE user_id = $1`,
            [userId]
        )
        return countOfCartItems;
    }catch(error){
        console.error('DB error:', error);
        throw new Error('Failed to fetch count cartItems')
    }
}

export async function fetchProductList(){
    try{
        console.log("Fetching product list");

        const data = await sql<Product[]>`SELECT * FROM products`;
        console.log("Data fetch completed");

        return data;
    }
    catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product data.');
    }
}

export async function fetchProduct(id: string){
    try{
        console.log('Fetching product');
        const data = await sql<Product[]>`SELECT * FROM products WHERE products.id = ${id} `;
        console.log('Data fetch completed');

        return data;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

export async function fetchFilteredProducts(
    query: string,
    currentPage: number,
) {
    try{
        const products = await sql<Product[]>`
        SELECT
        products.id,
        products.name,
        products.image_url,
        products.quantity,
        products.size,
        products.price,
        products.category
        FROM products
        WHERE products.name ILIKE ${`%${query}%`} OR
        products.category ILIKE ${`%${query}%`}
        
        `;
        console.log('filtered data fetch completed')
        return products;
    }catch(error){
        console.error('Database Error:', error);
        throw new Error('failed to fetch product data.');
    }
    
}