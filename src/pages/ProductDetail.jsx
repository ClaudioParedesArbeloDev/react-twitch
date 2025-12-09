//importando las librerias necesarias
import { useState, useEffect } from "react";
//useParams sirve para obtener los parametros de la ruta url
import { useParams } from "react-router-dom";

//importar el contexto de carrito
import { useCart } from "../context/CartContext";

//importar los componentes
import QuantityCounter from "../components/QuantityCounter";
import API from "../api/api"; //Llamo directamente a la importacion del archivo API


function ProductDetail() {

    /* aca obtenemos el parametro del id a traves de la url */
    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    //hook use cart
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${API}/${id}`); //Llamo directamente a la importacion del archivo API
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]); /* esto vuelve a cargar cada vez que se le pasa un id */
    

   /* esta funcion se utiliza para agregar el producto al carrito y necesita que le pasemos el producto y la cantidad */
    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`¡${quantity} "${product.title}" agregado al carrito!`);
        setQuantity(1);
    };

    //si el producto no existe, mostramos un mensaje de cargando
    if (!product.title) return <div className="text-center py-20">Cargando...</div>;
    
    return(
        <div className="flex flex-col items-center justify-between md:grid md:grid-cols-2 md:justify-center gap-6 p-4 md:p-8">

  
        <h2 className="text-2xl font-bold md:col-span-2 md:text-center md:text-4xl md:pb-4">
            {product.title}
        </h2>

  
        <img 
            src={product.images} 
            alt={product.title}
            className="w-2/3 md:w-full md:max-w-md object-contain"
        />

  
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6">
            <p className="text-base md:text-lg max-w-lg">
                {product.description}
            </p>
    
            <p className="font-bold text-2xl md:text-3xl">
            ${product.price}
            </p>
            <div>
                {/* esto es el contador que es un componente */}
                <QuantityCounter initial={quantity} onChange={setQuantity} />
                <button 
                    /* todo lo que tenga el subfijo on esta esperando un evento, en este caso click y este evento */
                    /* se ejecutara cuando se haga click en el boton */
                    onClick={handleAddToCart}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg transition w-[250px] md:w-auto">
                    Agregar al Carrito
                </button>
            </div>
        </div>

    </div>
    )
}

export default ProductDetail;