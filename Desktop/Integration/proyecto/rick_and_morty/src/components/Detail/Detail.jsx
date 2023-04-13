import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import style from "./Detail.module.css"

const Detail = () =>{
    const {id} = useParams();
    const [character, setCharacter] = useState({});

    const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
    const API_KEY = 'e0fff313dedb.32088695d26d0991ef75';

    useEffect(() => {
        axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(({ data }) => {
           if (data.name) {
              setCharacter(data);
           } else {
              window.alert('No hay personajes con ese ID');
           }
        });
        return setCharacter({});
     }, [id]);

    return(
        <div className={style.container}>
            <div className={style.infoDetail}>
                <h1>{character?.name}</h1>
                <h2>Status: {character?.status}</h2>
                <h2>Gender: {character?.gender}</h2>
                <h2>Specie: {character?.species}</h2>
                <h2>Origin: {character?.origin?.name}</h2>
            </div>
            <div className={style.image}>
                <img id={style.person} src={character?.image} alt={character?.name} />
            </div>
        </div>
    )

}

export default Detail;