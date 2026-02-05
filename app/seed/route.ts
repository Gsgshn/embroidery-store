import bcrypt from 'bcrypt';
import postgres from 'postgres';
import {users, products} from '@/lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      quantity INT,
      size VARCHAR(255) NOT NULL,
      price INT NOT NULL,
      category VARCHAR(255) NOT NULL,
      image_url VARCHAR(255) NOT NULL 
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (products) => sql`
        INSERT INTO products (name, quantity, size, price, category, image_url)
        VALUES ( ${products.name}, ${products.quantity}, ${products.size}, ${products.price}, ${products.category}, ${products.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

async function seedOrders(){
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS orders(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        user_id UUID NOT NULL
    );
    `;
}

async function seedOrdersItems(){
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS ordersItems(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        order_id UUID NOT NULL,
        product_id UUID NOT NULL,
        quantity INT NOT NULL
    );
    `;
}

async function seedCartItems() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
  CREATE TABLE IF NOT EXISTS cartItems(
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    product_id UUID,
    quantity INT DEFAULT 1
  );
  `;
}

export async function GET() {
  try{
    const result = await sql.begin((sql)=>[
      seedProducts()
    ]);
    return Response.json({message:"Databes seeded successfully"})
  }
  catch(error){
    return Response.json({error},{status:500})
  }
  
}

