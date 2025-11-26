import { useState } from 'react';

function SortSelect({ onSortChange }) {

    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onSortChange(value);
    };

    return (
        <select
            value={selected}
            onChange={handleChange}
            className='w-full md:w-64 border border-gray-600 rounded-lg px-5 py-3 mb-4' 
        >
            <option value="">Ordenar por</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="title-asc">Nombre: A - Z</option>
            <option value="title-desc">Nombre: Z - A</option>
        </select>
    );
};

export default SortSelect;