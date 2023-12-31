import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
} from "../../redux/actions";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar"

import style from "../Home/Home.module.css"

function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector(state => state.dogs); //valores del estado global de redux que requiero
  const allTemperaments = useSelector(state => state.temperaments);

  const [currentPage, setCurrentPage] = useState(1);
  const dogsPerPage = 8;
  const lastIndex = currentPage * dogsPerPage; 
  const firstIndex = lastIndex - dogsPerPage;
  const currentDogs = allDogs.slice(firstIndex, lastIndex);//elementos a renderizar en la pagina, segun el valor de paginado

  console.log(currentDogs);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  // eslint-disable-next-line
  const [orden, setOrden] = useState("");

  useEffect(() => {
    //acciones a depachar luego de montar el componente
    dispatch(getAllDogs());
    dispatch(getTemperaments());
  }, [dispatch]);

  const handleFilterByTemperament = (e) => {
    e.preventDefault();    
    dispatch(FilterByTemperament(e.target.value));
  };

  const handleOrderByName = (e) => {
    e.preventDefault();
    dispatch(OrderByName(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
    setOrden(`Ordenado ${e.target.value}`);
  };

  return (
    <>
    <div className={`${style.background}`}>
      <header className={`${style.header}`}>
        <div className={`${style.header_container_left}`}>

          <Link to="/">
            <div className={`${style.logo}`}>La perrera</div>
          </Link>
          
          <div className={`${style.header_left}`}>

            <SearchBar />

            <div className={`${style.container_filters}`}>
              <select onChange={handleOrderByName}>
                <option disabled selected defaultValue>
                Filtrar por orden alfabético
                </option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>

              <select onChange={handleOrderByWeight}>
                <option disabled selected defaultValue>
                  Filtrar por peso
                </option>
                <option value="max_weight">Maximo</option>
                <option value="min_weight">Minimo</option>
              </select>

              <select onChange={handleFilterByTemperament}>
                  <option disabled selected defaultValue>Filtrar por temperamento</option>
                  <option value="Todos">Todos</option>
                  {
                    allTemperaments?.map(temp => (
                        <option value={temp.name}  key={temp.id}>{temp.name}</option>
                    ))
                  }
              </select>

            </div>
            
          </div>
        </div>
        <div className={`${style.header_right}`}>
          <Link to="/dog">
            <button className={`${style.button_add_dog}`}>CREAR MASCOTA</button>
          </Link>
        </div>
      </header>

      <hr />

    <div className={style.main_container}>
      <div className={style.container_cards}>
        {currentDogs?.map((el) => {//validacion que existan los datos
          return(
            <div className={`${style.container_card}`} key={el.id}>
              <Link to={"/dog-detail/"+el.id}>
                {
                  <Card key={el.id} image={el.image} name={el.name} temperaments={el.temperaments[0].name ? el.temperaments.map(el => el.name) : el.temperaments}/>
                  //si temperaments viene en un formato distinto desde la BD
                }
              </Link>
            </div>      
          )
        })}
      </div>
      <div className={`${style.pagination}`}>
        <Paginate dogsPerPage={dogsPerPage} allDogs={allDogs.length} paginado={paginado}/> 
      </div>
    </div>
    </div>
    </>
  );
}

export default Home;
