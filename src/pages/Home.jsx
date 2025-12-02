//importando las librerias necesarias
import { useState, useEffect } from "react";

//importando los componentes
import API from "../api/api"; //Llamo directamente a la importacion del archivo API
import CategoryFilter from "../components/CategoryFilter";
import Card from "../components/Card";
import ProductFilters from "../components/ProductFilters";
import SortSelect from "../components/SortSelect";

//creamos la funcion Home
function Home() {
    //hooks use state
    //use state va a tener primero entre corchetes la variable que va a almacenar el estado
    //y la variable que va a actualizar el estado(set)
    //useState va a tener entre parentesis el valor inicial del estado
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [sortOption, setSortOption] = useState("");

    //Vamos a hacer una Paginacion 
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 10;

    //useEffect es una hook que se ejecuta una vez que un componente se renderiza
    //va a contar de una funcion y vamos a colocar una , y entre corchetes vamos a colocar el disparador
    //que va a ejecutar la funcion y si esta vacio se ejecuta con la carga de la pagina
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(API);//Llamo directamente a la importacion del archivo API
            const data = await response.json();//vamos a obtener el json
            setProducts(data);//vamos a setear o cambiar el estado de contenedor
            setFiltered(data);
        };
        fetchProducts();//llamo a la funcion
    }, []);

    

   useEffect(() => {
        //Vamos a crear una variable resultado
        //y vamos a setearlo con el valor de products
        let result = [...products];

        if (searchTerm) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory){
            result = result.filter((p) => p.category.name === selectedCategory);
        }

        if(sortOption) {
            if(sortOption === "price-asc") result.sort((a, b) => a.price - b.price);
            if(sortOption === "price-desc") result.sort((a, b) => b.price - a.price);
            if(sortOption === "title-asc") result.sort((a, b) => a.title.localeCompare(b.title));
            if(sortOption === "title-desc") result.sort((a, b) => b.title.localeCompare(a.title));
        }
        setCurrentPage(1);
        setFiltered(result);
    }, [products, searchTerm, selectedCategory, sortOption]);

    //Calculo de productos de la pagina actual
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filtered.slice(indexOfFirstProduct, indexOfLastProduct);

    //Total de las paginas
    const totalPages = Math.ceil(filtered.length / productsPerPage);

    //Generar Numeros de paginas
    const getPageNumbers = () => {
        const pages = [];
        const maxPages = 5;

        if(totalPages <= maxPages) {
            for(let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if(currentPage <= 3){
                for(let i = 1; i <= 4; i++) pages.push(i);
                pages.push("...", totalPages);
            } else if(currentPage >= totalPages - 2) {
                pages.push(1, "...",);
                for(let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    }
   
    return(
        <div className="flex flex-col items-center pt-4 md:pt-8">
            <div className="flex flex-col md:flex-row justify-around w-full">
                <ProductFilters onSearch={setSearchTerm}/>
                <CategoryFilter onCategoryChange={setSelectedCategory} />
                <SortSelect onSortChange={setSortOption} />
            </div>
            <div>
                <p>
                    Mostrando {indexOfFirstProduct + 1} -{Math.min(indexOfLastProduct, filtered.length)} de {filtered.length} productos
                </p>
            </div>

            <div className="flex flex-wrap justify-center">
            {currentProducts.map(product => (
                <Card key={product.id} product={product}/>       
            ))}
            </div>
            {/* Paginacion */}
            <div className="flex justify-center items-center mt-4">
                {/* Boton de la pagina anterior */}
                <button 
                    onClick={()=> setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg transition w-[250px] md:w-auto"
                    
                >
                    Anterior
                </button>
                {/* Numero de pagina actual */}
                {getPageNumbers().map((page, index) => 
                    page === "..." ? (
                        <span key={index} className="mx-2">...</span>
                        ) : (
                            <button
                                key={index}
                                onClick={()=> setCurrentPage(page)}
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg transition w-[250px] md:w-auto"
                            >
                                {page}
                            </button>
                    ))
                    }
                    {/* Boton de la pagina siguiente */}
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-4 px-8 rounded-lg transition w-[250px] md:w-auto"
                    >
                        Siguiente
                    </button>
            </div>
        </div>
        
    )
}

export default Home;