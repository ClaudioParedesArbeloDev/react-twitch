import Logo from '/logo.png'


function Navbar() {
    return(
        <header className='flex items-center justify-between px-4 shadow-xl bg-linear-to-t from-sky-300 to-indigo-700'>
            <div>
                <img
                className='w-26 md:w-[150px]' 
                src={Logo} 
                alt="Logo Corporativo" />
            </div>
            <div className='flex'>
                <i className="fa-solid fa-user text-2xl px-4"></i>
                <i className="fa-solid fa-cart-shopping text-2xl px-4"></i>
            </div>
        </header>
        
    )
}

export default Navbar;