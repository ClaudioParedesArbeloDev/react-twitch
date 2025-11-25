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
                    className="border rounded-lg px-4 py-3 w-full md:w-80 focus:ring-2 focus:ring-blue-500"
            />
        
    )
}

export default ProductFilters;