import React from 'react';
import Card from '../components/Card';
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PokemonModal from '../components/PokemonModal';
import axios from 'axios';
import Pagination from '@material-ui/lab/Pagination';
import './index.css';


function App({ onRequestClose }) {

  const [pokemons, setPokemons] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pokemon, setPokemon] = useState({});
  const [currentPage, setCurrentPage] = useState(1)
  const [itemPerPage, setItemtPerPage] = useState(10)
  const [pokemonsType, setPokemonsTypes] = useState([]);

  const location = useLocation();

  const fetchPokemon = async ()=> {
    try{
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=32&offset=0`);
      const pokemonsReq = res.data.results.map(({url}) =>{
        return axios.get(url)
      });

      const pokemons = await Promise.all(pokemonsReq)
      setPokemons(pokemons)
    } catch (err) {
      console.log(err);
    }
  };

//   const fetchTypes = async ()=> {
//     try{
//       const res = getParams("type").split('%2C').map(item=>{ return axios.get(`https://pokeapi.co/api/v2/type/${item}?limit=32&offset=0`)})
//       const types = await Promise.all(res)
//       setPokemonsTypes(types.map(item=>{return item.data.pokemon}))

//     } catch (err) {
//       console.log(err)
//     }
//   }

// console.log(pokemonsType)

  
  function getParams(param) {
    var result = window.location.search.match(
        new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
    );

    return result ? result[3] : false;
}
  if(getParams("type")){
  console.log(getParams("type").split('%2C'))
  }
  
  useEffect(() => {
    fetchPokemon();
  }, []);

  useEffect(() => {
    if(!getParams("name") && !getParams("type")){ return fetchPokemon() };
    if(getParams("name")){
    const filterPoke = pokemons.filter(pokemon=>{
      return pokemon.data.name.includes(getParams("name"))
     })
     setPokemons(filterPoke) }
    if(getParams("type")){

      // fetchTypes();

      const filterPoke = pokemons.filter(function (pokemon){
       for(let i=0; i <= getParams("type").split('2%C').length; i++){ 
         if(getParams("type").split('2%C')[i] === pokemon.data.types[0].type.name){
           return pokemon
         }
       }
       })
       setPokemons(filterPoke)
       console.log(pokemons, "filtered")
      }
      if(getParams("name") && getParams("type")){
        const filterPoke = pokemons.filter(pokemon=>{ 
          return pokemon.data.name.includes(getParams("name")) && getParams("type").split('2%C').includes(pokemon.data.types[0].type.name) 
        })
        setPokemons(filterPoke)
      }
     
  }, [location.search]);

  console.log(pokemons, "globPokemons")
   const indexOfLastItem = currentPage * itemPerPage;
   const indexOfFirstItem = indexOfLastItem - itemPerPage;
   const currentItems = pokemons.slice(indexOfFirstItem, indexOfLastItem)

   const handleChange = (event, value) => {
    setCurrentPage(value);
  };



  const onClick = (pokemon)=> {
    setPokemon(pokemon);
    setIsOpen(true);
  }



  return pokemons.length ? (
    <div className="App">
      <div className="main">
        <div className="cardList">
        {currentItems.map((pokemon, key)=> (
            <Card
              key={pokemon.data.id}
              onClick={()=>onClick(pokemon)}
              currentItems={currentItems}
              pokemon={pokemon}
            />
        ))}
        </div>
        <PokemonModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onRequestClose={onRequestClose}
          pokemon={pokemon}
        />
        <Pagination
          count={Math.ceil(pokemons.length / itemPerPage)}
          page={currentPage}
          onChange={handleChange}
        />
      </div>
    </div>
  ): null
}

export default App
