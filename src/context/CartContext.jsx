import { createContext, useContext, useState, useEffect } from "react";
//createContext sirve para crear un contexto
//useContext sirve para obtener el contexto

//hacemos una variable que va a almacenar el contexto
const CartContext = createContext();

export function CartProvider({ children }) {
    
    //el useState va a comenzar como un array vacio donde vamos a guardar los productos del carrito
    const [cart, setCart] = useState([]);

    //vamos a llamar del localStorage que hay en nuestro carrito
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) setCart(JSON.parse(saved));
    }, []);

    //el setItem lo que hace es guardar en el localStorage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    //funcion anonima que sirve para agregar productos al carrito
    const addToCart = (product, quantity = 1) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing){
                return prev.map((item) =>
                    item.id ===product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            }
            return [...prev, { ...product, quantity }];
        });
    };

    //funcion anonima que sirve para remover productos del carrito
    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    //funcion anonima que sirve para actualizar el cantidad de productos del carrito
    const updateQuantity = (id, quantity) => {
        if (quantity <= 0){
            removeFromCart(id);
            return;
        }
        setCart((prev) => 
            prev.map((item) =>
                item.id === id ? { ...item, quantity } : item));
        };
    
    //esta funcion anonima sirve para calcular el total de productos del carrito
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    //esta funcion anonima sirve para calcular el precio total del carrito
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    
    return(
        <CartContext.Provider
            value={{cart, addToCart, removeFromCart, totalItems,updateQuantity, totalPrice }}>
                {children}
            </CartContext.Provider>
    );
        
}

export const useCart = () => useContext(CartContext);