import SearchBar from "../SearchBar/SearchBar";
import style from "./Nav.module.css"
import { Link } from "react-router-dom";

const Nav = ({ onSearch, onRandom, setAccess}) => {

    const handleLogout = () =>{
        setAccess(false);       
    }

    return(
        <nav className={style.navBar}>
            <div className={style.links}>
                <button>
                    <Link to='./About/About' className={style.link}>ABOUT</Link>
                </button>
                <button>
                    <Link to='/home' className={style.link}>HOME</Link>
                </button>
                <button>
                    <Link to='/favorites' className={style.link}>FAVORITES</Link>
                </button>
                <button id={style.buttonLogout} onClick={handleLogout}>LOG OUT</button>
            </div>
            <div className={style.search}>
                <SearchBar onSearch={onSearch}/>
                <button onClick={onRandom} id={style.random}>AGREGAR ALEATORIO</button>
            </div>
        </nav>
    );
}

export default Nav;