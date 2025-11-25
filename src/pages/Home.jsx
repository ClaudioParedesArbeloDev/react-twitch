import { useState, useEffect } from "react";

import CategoryFilter from "../components/CategoryFilter";
import Card from "../components/Card";
import ProductFilters from "../components/ProductFilters";

function Home() {

    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
            setFiltered(data);
        };
        fetchProducts();
    }, []);

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
        setFiltered(result);
    }, [products, searchTerm, selectedCategory]);
   
    return(
        <div className="flex flex-col items-center pt-4 md:pt-8">
            <div className="flex flex-col md:flex-row justify-around w-full">
                <ProductFilters onSearch={setSearchTerm}/>
                <CategoryFilter onCategoryChange={setSelectedCategory} />
            </div>
            <div className="flex flex-wrap justify-center">
            {filtered.map((product) => (
                <Card key={product.id} product={product}/>       
            ))}
            </div>
        </div>
        
    )
}

export default Home;