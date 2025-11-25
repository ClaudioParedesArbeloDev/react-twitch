import { useState } from "react";

function QuantityCounter({ unitial = 1, onChange }) {

    const [quantity, setQuantity] = useState(unitial);

    const increment = () => {
        const newQty = quantity + 1;
        setQuantity(newQty);
        onChange?.(newQty);
       }

    const decrement = () => {
        if (quantity === 1) return;
        const newQty = quantity - 1;
        setQuantity(newQty);
        onChange?.(newQty);
        }
    
    return (
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit my-2">
            <button
                onClick={decrement}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-xl"
            > 
            - 
            </button>
            <span className="px-6 py-2 font-semibold text-lg">
                {quantity}
            </span>
            <button
                onClick={increment}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition text-xl"
            > 
            + 
            </button>
        </div>
    )

    };

export default QuantityCounter;