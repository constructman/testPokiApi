import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import axios from 'axios';
import { Link } from 'react-router-dom'
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import './index.css'
import { ListItemIcon } from '@material-ui/core';


function Header({ pokemons }) {

  const [pokemonType, setPokemonType] = useState([]);
  const [pokemonTypeName, setPokemonTypeName] = useState([]);
  const [pokeName, setPokeName] = useState("");

  const params = new URLSearchParams()
  const history = useHistory()
 
  const fetchTypes = async ()=> {
    try{
      const res = await axios.get('https://pokeapi.co/api/v2/type')
      const types = res.data.results.map(({name})=> name)
      setPokemonType(types)
      
    } catch(err){
      console.log(err)
    }
  };

  useEffect(()=> {
    fetchTypes();
  }, [])

  console.log(pokemonType)

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPokemonTypeName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };




  const onClick = ()=> {
    if(pokeName && pokemonType){
      params.append('name', pokeName.toLowerCase())
      history.push({ search: params.toString() })
      params.set('type', pokemonTypeName)
      history.push({ search: params.toString() })
      return
    }
    if(pokeName){
    params.append('name', pokeName.toLowerCase())
    history.push({ search: params.toString() })
    return
    }
    if(pokemonTypeName){
      params.set('type', pokemonTypeName)
      history.push({ search: params.toString() })
      return
    }
    
    history.replace("/")
    setPokeName("");
    setPokemonTypeName("");
    
  }


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };



    return (
      <div className="container">
        <div className="headerTop">
          <div className="social">vk, f, ins</div>
          <div className="regWrap">
            <div className="login">
              <AccountCircleIcon />
              <Button variant="outlined" color="primary" size="small" >Login</Button>
            </div>
            <div className="register">
              <Button variant="outlined" color="primary" size="small" >Register</Button>
            </div>
          </div>
        </div>
        <div className="headerBottom">
          <div className="logo"></div>
          <div className="navPanel">
            <div className="navPanList">
              <Link to='/' className='link'>
                <li><Button variant="contained" color="primary" size="large" >Home</Button></li>
              </Link>
              <Link to='/about' className='link'>
                <li><Button variant="contained" color="primary" size="large" >About</Button></li>
              </Link>
              <Link to='/favorites' className='link'>
                <li><Button variant="contained" color="primary" size="large" >Favorite</Button></li>
              </Link>
            </div>
          </div>
          <div className="filters">
            <div className="search">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Pokemon"
              inputProps={{ 'aria-label': 'Search Pokemon' }}
              onChange={e => {setPokeName(e.target.value)}}
              value={pokeName}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={onClick}>
              <SearchIcon />
            </IconButton>
            </div>
            <div className="searchType">
            <FormControl className="form" >
              <InputLabel id="demo-multiple-checkbox-label">Choose pokemon type</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={pokemonTypeName}
                onChange={handleChange}
                input={<OutlinedInput label="Choose pokemon type" />}
                renderValue={(selected) => selected.join(',')}
                MenuProps={MenuProps}
              >
                {pokemonType.map((item) => (
                  <MenuItem key={item} value={item}>
                    <Checkbox checked={pokemonTypeName.indexOf(item) > -1} />
                    <ListItemText primary={item} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </div>
          </div>
        </div>
      </div>
      );
}

export default Header