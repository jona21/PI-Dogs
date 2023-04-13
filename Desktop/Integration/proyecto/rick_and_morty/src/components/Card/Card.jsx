import { Link } from "react-router-dom";
import style from './Card.module.css';
import { addFav, removeFav } from '../../redux/actions';
import { connect } from 'react-redux';
import { useState, useEffect } from "react";

function Card({id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites}) {

   const [isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         removeFav(id);
      }
      else {
         setIsFav(true);
         addFav({id, name, status, species, gender, origin, image, onClose})
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div className={style.container}>
       <button className={style.close} onClick={() => onClose(id)}>X</button> {/*en casos como este: onClick={() => onClose(id)} debo de hacer una calback para que el codigo funcione */}
       <button className={style.favorit} onClick={handleFavorite}>{isFav ? '❤️' : '🤍' }</button>
         {/* <h2>{id}</h2> */}
         <Link to={`/Detail/Detail/${id}`} className={style.LinkName}>
            <h2 className={style.name}>{name}</h2>
         </Link>
         <img src={image} alt='' className={style.image}/> 
         <h2>Status: {status}</h2>
         <h2>Species: {species}</h2>
         <h2>Gender: {gender}</h2>
         <h2>Origin: {origin}</h2>
   </div>
   );
}

const mapStateToProps = (state) => {
   return {
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => { dispatch(addFav(character)) },
      removeFav: (id) => { dispatch(removeFav(id)) }
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);