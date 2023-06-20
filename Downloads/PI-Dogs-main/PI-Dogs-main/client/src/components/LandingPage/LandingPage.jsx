import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";

function LandingPage() {
  return (
    <div className={`${style.main_container}`}>
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >La perrera</h1>
        <h3>¡Conoce al mejor amigo del hombre!</h3>
        <div className={`${style.left_paragraph}`}>
          <p>
          Aquí podrás encontrar información de los caninos como: 
          raza, altura, tamaño, peso, esperanza de vida y temperamento. 
          Además, podrás crear una categoría para tu mascota y así hacer crecer un poco más 
          nuestro conocimiento sobre ellos.
          </p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Echa un vistazo</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;
