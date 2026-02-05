import { auth } from "@/auth";
import { pool } from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(){
    const session = await auth();
    const userId = session?.user?.id;
    try{
        const result = await pool.query(
            `SELECT 
            o.id AS order_id,
            o.user_id,
            SUM(p.price * oi.quantity) AS total_price,
            json_agg(
            json_build_object(
                'product_id', p.id,
                'name', p.name,
                'price', p.price,
                'quantity', oi.quantity
            )
            ) AS products
            FROM orders o
            JOIN ordersitems oi ON o.id = oi.order_id
            JOIN products p ON oi.product_id = p.id
            WHERE o.user_id = $1
            GROUP BY o.id, o.user_id`,
            [userId]
        );
        return NextResponse.json(result.rows)
    }catch(error: any){
        console.error('DB error:', error)
        return NextResponse.json({error: error.message},{status:500})
    }
    
    
    
}


export async function POST(req: Request){
    try{
        
        const session = await auth();
        const userId = session?.user?.id;

        const orderResult = await pool.query(
            `INSERT INTO orders (user_id) VALUES ($1) RETURNING id`,
            [userId]
        );
        
        
        const orderId = orderResult.rows[0].id

        const cartResult = await pool.query(
            `SELECT product_id, quantity
            FROM cartitems
            WHERE user_id = $1 `,
            [userId]
        );

        for (const item of cartResult.rows){
            await pool.query(
                `INSERT INTO ordersitems (order_id, product_id, quantity)
                VALUES ($1, $2, $3)`,
                [orderId, item.product_id, item.quantity]
            );
        }

        await pool.query(`DELETE FROM cartitems WHERE user_id = $1`, [userId]);
        
        return NextResponse.json({success: true, orderId})
    }catch(error: any){
        console.error('DB error:', error)
        return NextResponse.json({error: error.message},{status:500})
    }
}