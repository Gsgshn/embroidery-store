import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(false);

   
      
      

  

  return (
    <CartContext.Provider value={{ cart, setCart} }>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
