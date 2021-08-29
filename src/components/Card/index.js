import React from 'react'
import { useState, useEffect } from 'react'
import Pokedex from 'pokedex-promise-v2'
import axios from 'axios'
import './index.css'

const options = {
  protocol: 'https',
  hostName: 'localhost:3000/app',
  versionPath: '/api/v2/',
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000 // 5s
}
const P = new Pokedex(options);

function Card () {

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchPokemon = async ()=> {
      try{
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=60&offset=60`);
        setData(res.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchPokemon();
    
  }, []);
  console.log({data})

  return(
    <div className="wrapCard">
        <div className="card">
          <div className="image">
            <div className="stats"></div>
          </div>
        </div>
    </div>
  );
}

export default Card