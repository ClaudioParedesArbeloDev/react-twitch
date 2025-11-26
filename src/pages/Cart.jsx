import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantityCounter from "../components/QuantityCounter";

function Cart() {

    const { cart, updateQuantity, removeFromCart, totalItems } = useCart();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

    if (cart.length === 0) {
        return (
            <div>
                <i className="fa-solid fa-cart-shopping text-9xl text-gray-300 mb-8"></i>
                <h2 className="text-2xl font-bold">Tu carrito esta vacio</h2>
                <p className="text-lg">
                    Agrega algunos productos a tu carrito para poder comprarlos
                </p>
                <Link to="/" className="text-blue-500 hover:underline">
                    Volver a la tienda
                </Link>
            </div>
        )
    }
    return (
        <div>
            <div>
                <h1>
                    Mi Carrito ({totalItems} {totalItems === 1 ? "producto" : "productos"})
                </h1>

                <div>
                    {cart.map((item) => (
                        <div key={item.id}>
                            <Link to={`/product/${item.id}`}>
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-1/3 md:w-1/4 object-contain"
                                />
                            </Link>

                            <div>
                                <Link to={`/product/${item.id}`}>
                                    {item.title}
                                </Link>
                                <p>${item.price.toFixed(2)} c/u</p>
                            </div>
                            <div>
                                <QuantityCounter
                                    initial={item.quantity}
                                    onChange={(quantity) => updateQuantity(item.id, quantity)}
                                />
                            </div>

                            <div>
                                <p>
                                    ${item.price * item.quantity.toFixed(2)}
                                </p>
                            </div>
                            <button onClick={()=> removeFromCart(item.id)} title="Eliminar Producto">
                                <i className="fa-solid fa-trash-can text-2xl text-red-500"></i>
                            </button>
                        </div>
                    ))}
                </div>
                <div>
                    <div>
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                    </div>
                    <div>
                        <Link to="/">Seguir Comprando</Link>
                        <button>Proceder al pago</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;