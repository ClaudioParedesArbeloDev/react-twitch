import { useState, useEffect } from "react";

function CategoryFilter({onCategoryChange}) {

    const [categories, setCategories] = useState([]);

    const [selected, setSelected] = useState("");

    
    useEffect(()=>{
        fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            const uniqueCategories = [...new Set(data.map(p => p.category))];
            setCategories(uniqueCategories);
        })
        
    },[])

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onCategoryChange(value);
    }

    console.log(categories)

    return (
        <select 
            value={selected}
            onChange={handleChange}
            className="w-full md:w-64 border border-gray300 rounded-lg px-5 py-3 my-4"
            >
                <option value="">Todas las categorias</option>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                ))}
                <option/>
        </select>
    )

}

export default CategoryFilter;
    