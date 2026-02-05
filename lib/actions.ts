'use server';
 
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcrypt';
import { success } from 'zod';

import { pool } from './db';
 
export async function registration(
  prevState: { success: boolean; message: string } | undefined,
  formData: FormData
): Promise<{ success: boolean; message: string }> {

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const hashedPassword = await bcrypt.hash(password, 10);

  console.log(name, email, password, hashedPassword)

  if(!name || !email || !password){
    return{success:false, message:"Заполните все поля"}
  }

  try{
    await pool.query(
      `INSERT INTO users (name, email, password)
      VALUES ($1, $2 ,$3)
      ON CONFLICT (email) DO NOTHING`,
      [name, email, hashedPassword]
)
    return {success: true, message: "Регистрация прошла успешно"}
  }catch (error){
    console.error("DB error",error);
     throw new Error('Failed to fetch product data.');
  }

}
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}