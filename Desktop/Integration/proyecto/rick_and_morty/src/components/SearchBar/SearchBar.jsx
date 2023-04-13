import { useState } from 'react';
import style from './SearchBar.module.css'

export default function SearchBar({ onSearch }) {
   const [id, setId] = useState('');

   const handleChange = (event) => {
      setId(event.target.value)//aqui se captura el valor ingresado en el input.
   }

   return (
      <div>
         <input type='search' onChange={handleChange} value={id} id={style.inputSearch}/>
         <button onClick={() =>{onSearch(id); setId('')}} id={style.buttonSearch}>AGREGAR</button>{/*para agregar otra propiedad a una callback debo de abrir y cerrar llaves y separar los parametros por ";" */}
      </div>
   );
}
