import { useState, useEffect } from "react";

import API from "../api/api";
import CategoryFilter from "../components/CategoryFilter";
import Card from "../components/Card";
import ProductFilters from "../components/ProductFilters";
import SortSelect from "../components/SortSelect";

function Home() {

    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOption, setSortOption] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://api.escuelajs.co/api/v1/products');
            const data = await response.json();
            setProducts(data);
            setFiltered(data);
        };
        fetchProducts();
    }, []);

    console.log(products)

   useEffect(() => {
        let result = [...products];

        if (searchTerm) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory){
            result = result.filter((p) => p.category === selectedCategory);
        }

        if(sortOption) {
            if(sortOption === "price-asc") result.sort((a, b) => a.price - b.price);
            if(sortOption === "price-desc") result.sort((a, b) => b.price - a.price);
            if(sortOption === "title-asc") result.sort((a, b) => a.title.localeCompare(b.title));
            if(sortOption === "title-desc") result.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFiltered(result);
    }, [products, searchTerm, selectedCategory, sortOption]);
   
    return(
        <div className="flex flex-col items-center pt-4 md:pt-8">
            <div className="flex flex-col md:flex-row justify-around w-full">
                <ProductFilters onSearch={setSearchTerm}/>
                <CategoryFilter onCategoryChange={setSelectedCategory} />
                <SortSelect onSortChange={setSortOption} />
            </div>
            <div className="flex flex-wrap justify-center">
            {filtered.map(product => (
                <Card key={product.id} product={product}/>       
            ))}
            </div>
        </div>
        
    )
}

export default Home;