import Logo from '/logo.png'
import { useCart } from "../context/CartContext";
import { Link } from 'react-router-dom';

function Navbar() {

    const { totalItems } = useCart();

    return(
        <header className='flex items-center justify-between px-4 shadow-xl bg-linear-to-t from-sky-300 to-indigo-700'>
            <div>
                <Link to="/" >
                    <img
                    className='w-26 md:w-[150px]' 
                    src={Logo} 
                    alt="Logo Corporativo" />
                </Link>
            </div>
            <div className='flex'>
                <i className="fa-solid fa-user text-2xl px-4"></i>
                <Link to="/cart" className='relative'>
                <i className="fa-solid fa-cart-shopping text-2xl px-4"></i>
                {totalItems > 0 && (
                    <span className='absolute -top-4 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center'>
                        {totalItems}
                    </span>
                )}
                </Link>
            </div>
        </header>
        
    )
}

export default Navbar;