import style from "./About.module.css"
import logo from "../Assets/img/H.png"

const About = () => {
    return(
        <div className={style.container}>
            <h1>APLICACIÓN PARA EL MÓDULO 2</h1>
            <p className={style.pContent}>Esta es una aplicación de prueba para el módulo 2 de Henry, 
            la cual busca aplicar todos los conocimientos obtenidos durante las tres semanas del curso.</p>
            <img src={logo} alt="" className={style.imgLogo} />
        </div>

    )
}

export default About;