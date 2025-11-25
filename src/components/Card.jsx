import { Link } from "react-router-dom";

function Card({product}) {

    return(
        <div className="border shadow-xl/35  rounded-2xl w-5/6 md:w-[300px] md:mx-8 h-[550px] p-8 my-8">
            <Link to={`/product/${product.id}`} className="flex flex-col justify-between items-center h-full">
                <img src={product.image} alt={product.title} className="h-[300px] overflow-hidden w-auto" />
                <h3 className="text-center">{product.title}</h3>
                <p className="font-bold text-xl">${product.price}</p>
            </Link>
        </div>    
    )
}

export default Card;