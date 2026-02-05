import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@/auth";


export async function GET() {
  const session = await auth();
  const userId = session?.user?.id; 
  
  const result = await pool.query(
    `SELECT c.id, p.name, p.price, c.quantity, p.image_url, c.product_id
     FROM cartitems c
     JOIN products p ON c.product_id = p.id
     WHERE user_id = $1`,
    [userId]
  );
  return NextResponse.json(result.rows);
  
}


export async function POST(req: Request) {
    try{
        const session = await auth();
        const { productId, quantity } = await req.json();
        const userId = session?.user?.id; 
        
        await pool.query(
            `INSERT INTO cartitems (user_id, product_id, quantity)
             VALUES ($1, $2, $3)
             ON CONFLICT (user_id, product_id)
             DO UPDATE SET quantity = cartitems.quantity + EXCLUDED.quantity;
             `,
            [userId, productId, quantity]
        );

        

        return NextResponse.json({ success: true });
    }catch (err: any) {
    console.error("DB error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
 
}

export async function PUT(req: Request){
  const session = await auth();
    const {productId, action} = await req.json();
    const userId = session?.user?.id;
      console.log(productId,action,userId)
  try{
    
    if (action === "increase" ){
      await pool.query(
        `UPDATE cartitems SET quantity = quantity + 1 WHERE user_id=$1 AND product_id=$2`,
        [userId, productId]
      );
    } else if(action === "decrease"){
      await pool.query(
        `UPDATE cartitems SET quantity = GREATEST(quantity - 1, 1) WHERE user_id=$1 AND product_id=$2`,
        [userId, productId]
      );
    }

    return NextResponse.json({success: true});

  }catch (err: any) {
    console.error("DB error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req:Request) {
  try{
    const session = await auth();
    const userId = session?.user?.id;
    const {productId} = await req.json();

    await pool.query(
      `DELETE FROM cartitems WHERE user_id = $1 AND product_id = $2`,
      [userId, productId]
    );

    return NextResponse.json({success: true});
  }catch (err: any) {
    console.error("DB error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
  
}