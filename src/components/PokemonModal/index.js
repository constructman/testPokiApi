import React from 'react'
import Modal from 'react-modal'
import Button from '@material-ui/core/Button';
import './index.css'

Modal.setAppElement('#root')

const PokemonModal = ({ isOpen, setIsOpen, pokemon }) => {

  const onClickClose = ()=> {
    setIsOpen(false)
  };

  const onRequestClose = ()=> {
    setIsOpen(false)
  };


  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onRequestClose={onRequestClose}
      >
        { pokemon.data && (
          <div classname="modalMain">
            <h2>{pokemon.data.name}</h2>
            <div className="modalWrap">
              <div className="modalCard">
                <div className="modalImg" style={{ backgroundImage: `url(${pokemon.data.sprites.front_default})` }} />
              </div>
              <div className="statsWrap">
                <div className="modalStats">
                      <ul>
                        <li>
                          <span>Weight</span>
                          <span>{pokemon.data.weight/10} kg</span>
                        </li>
                        <li>
                          <span>Height</span>
                          <span>{pokemon.data.height/10} m</span>
                        </li>
                      </ul>
                    <ul> Abilities
                      <li>{pokemon.data.abilities[0].ability.name}</li>
                    </ul>
                </div>
                <div className="modalStatsType">
                    <div className={pokemon.data.types[0].type.name}>{pokemon.data.types[0].type.name}</div>
                    <div className={pokemon.data.types[1].type.name}>{pokemon.data.types[1].type.name}</div>
                </div>
              </div>
            </div>
          </div>
        )
        }
        <Button onClick={onClickClose} variant="outlined" color="primary" size="small" >Close</Button>
      </Modal>
    </>
  )
}

export default PokemonModal
