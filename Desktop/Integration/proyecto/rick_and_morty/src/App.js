import './App.css';
import Cards from './components/Cards/Cards.jsx';
import Nav from './components/Nav/Nav';
import About from './components/About/About';
import Detail from './components/Detail/Detail';
import Error404 from './components/Error404/Error404';
import Form from './components/Form/Form';
import Favorites from "./components/Favorites/Favorites"
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes,Route, useLocation,Navigate,useNavigate } from 'react-router-dom';

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const API_KEY = 'e0fff313dedb.32088695d26d0991ef75';

const EMAIL = 'pepitoperez@gmail.com';
const PASSWORD = '159753';

function App() {
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   const login = (userData) => {
      if (userData.password === PASSWORD && userData.email === EMAIL) {
        setAccess(true);
        navigate('/home');
      }
   }

   useEffect(() => {
    !access && navigate('/')
 }, [access]);

   const onSearch =(id) => {
      axios(`${URL_BASE}/${id}?key=${API_KEY}`)
      .then(({ data }) => {

        if (!data.name) {
          window.alert('¡No hay personajes con este ID!');
          return;
        }
        if (characters.some((char) => char.id === data.id)) {
          window.alert('Este personaje ya ha sido agregado');
          return;
        }
        setCharacters((oldChars) => [...oldChars, data]);
      });
   }

   const onClose = (id) => {
      //const parsedId = parseInt(id, 10);
      setCharacters(characters.filter((char) => char.id !== id));
   }

   const onRandom = () => {
      const randomId = Math.floor(Math.random() * 826) + 1; // Generamos un número aleatorio entre 1 y 826
      axios(`${URL_BASE}/${randomId}?key=${API_KEY}`)
        .then(({ data }) => {
          if (data.name) {
            // Si el personaje no existe en el array de personajes, lo agregamos
            if (!characters.some(char => char.id === data.id)) {
              setCharacters([...characters, data]);
            } else {
              window.alert('¡Este personaje ya fue agregado!');
            }
          } else {
            // Si no existe el personaje con ese ID, volvemos a intentar con otro
            onRandom();
          }
        });
    };

    const {pathname} = useLocation();
    //console.log(useLocation());

   return (
      <div className='App'>
         {pathname!=='/' && pathname!== '/Error404' && <Nav onSearch={onSearch} onRandom={onRandom} setAccess={setAccess}/>}
         <Routes>
            <Route path='/' element={<Form login={login}/>}/>
            <Route path='/home' element={<Cards characters={characters} onClose={onClose} />}/>
            <Route path='/About/About' element={<About/>}/>
            <Route path='/Detail/Detail/:id' element={<Detail/>}/>
            <Route path='/favorites' element={<Favorites/>} />
            <Route path='*' element={<Navigate to='/Error404' />} />
            <Route path='/Error404' element={<Error404 />} />
         </Routes>      
      </div>
   );
}

export default App;
