import React from 'react'

import './index.css'



function Card ({ pokemon, onClick }) {

  const typeClass = "wrapCard";


  return (
  <>
    <div onClick={onClick} pokemon={pokemon} className={`${typeClass} ${pokemon.data.types[0].type.name}`}>
      <div className="card" >{pokemon.data.name}</div>
      <div className="image" style={{ backgroundImage: `url(${pokemon.data.sprites.front_default})` }} />
      <div className="stats" >
        <ul>
          <li>weight:</li>
          <li>height:</li>
          <li>type:</li>
        </ul>
        <ul>
          <li>{pokemon.data.weight/10} kg</li>
          <li>{pokemon.data.height/10} m</li>
          <li>{pokemon.data.types[0].type.name}</li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default Card