import { fetchProductList } from "@/lib/data";
import ProductCard from "@/components/product/productCard";



export default async function Home() {

  const products = await fetchProductList();

   return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Вышивка Онлайн</h1>
      <p className="mt-4">Авторские наборы и материалы для вашего творчества</p>
      <a href="/catalog" className="mt-6 px-4 py-2 bg-neutral-800  rounded">
        Перейти в каталог
      </a>
    </main>
  );
}
