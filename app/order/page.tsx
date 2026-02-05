'use client'
import { useEffect, useState } from "react";



export default function Page(){

    const [orders, setOrders] = useState([]);
    async function fetchOrderList() {
        const res = await fetch('/api/order')
        if(res.ok){
            const data = await res.json();
            console.log(data)
            console.log(res)
            setOrders(data);
        }
    }
    useEffect(()=>{
        async function loadOrder() {
            await fetchOrderList();
        }
        loadOrder();
    }, ([]));

    return(
        <div className="rounded-4xl bg-neutral-800 w-[70%] flex flex-col ms-15 mt-10 items-center md:mx-40 xl:w-[80%] xl:ms-50">
              <h1 className="my-5 xl:text-5xl md:text-5xl">My Orders</h1>
              <ul className="w-[90%] flex flex-col justify-between">
                {orders.map((order) => (
                  <li
                    key={order.id}
                    className="bg-neutral-900 rounded-4xl my-3 p-5 flex flex-col xl:text-2xl"
                  >
                    <p className="text-xl">Order Id: {order.order_id}</p>
                    <ul className="flex flex-col p-2">
                      {order.products.map((product) =>(
                        <li key={product.id} className="flex flex-col rounded-4xl bg-neutral-800 my-3 p-5">
                          <p>Product name: {product.name}</p>
                          <p>Quantity: {product.quantity}</p>
                          <p>Price: {product.price}</p>
                          <p>TotalPrice of product: {Number(product.price) * Number(product.quantity)} рубленных</p>
                        </li>
                      ))}
                    </ul>
                    <p>Total price of order: {order.total_price} рубленных</p>
                  </li>
                ))}
              </ul>
              
            </div>
    )
}