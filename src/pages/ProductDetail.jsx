import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuantityCounter from "../components/QuantityCounter";
import { useCart } from "../context/CartContext";
import API from "../api/api";


function ProductDetail() {

    const { id } = useParams();

    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);

    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`${API}/${id}`);
            const data = await response.json();
            setProduct(data);
        };
        fetchProduct();
    }, [id]);
    

    console.log(product)
    const handleAddToCart = () => {
        addToCart(product, quantity);
        alert(`¡${quantity} "${product.title}" agregado al carrito!`);
        setQuantity(1);
    };

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
                <QuantityCounter initial={quantity} onChange={setQuantity} />
                <button 
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