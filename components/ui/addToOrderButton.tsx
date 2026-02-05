'use client'

import { useState } from "react"

export default function AddToOrderButton(){
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleOrder() {
        try{
            setLoading(true);
            setMessage("");

            const res = await fetch("/api/order", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
            });

            const data = await res.json();
            console.log(data)
            if (res.ok){
                setMessage(`success! Order ID: ${data.orderId}`);
            }else {
                setMessage(`Error: ${data.error}`);
            }
        }catch(error){
            setMessage("error")
        } finally{
            setLoading(false);
        }
        
    }
    
    return(
        <div className="mt-4">
            <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full p-5 hover:outline-gray-400 my-10 outline outline-0.5 outline-gray-600 md:text-2xl text-xl text-white rounded-full"
            >
                {loading ? "Making..." : "Place an order"}
            </button>
            {message && <p className="mt-2 text-sm text-gray-700">{message}</p>}
    </div>
    )
}