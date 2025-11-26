import { useState } from "react";

function ProductFilters({onSearch}) {

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        onSearch(value);
    };

    return (
        
            <input  type="text" 
                    placeholder="Buscar Producto" 
                    value={search}
                    onChange={handleSearch}
                    className="border border-gray-500 rounded-lg px-4 py-3 w-full mb-4 md:w-80 "
            />
        
    )
}

export default ProductFilters;