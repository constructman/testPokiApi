import React from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import './index.css'


function Header() {

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
            <ul>
              <Link to='/app' className='link'>
                <li><Button variant="contained" color="primary" size="large" >Home</Button></li>
              </Link>
              <Link to='/about' className='link'>
                <li><Button variant="contained" color="primary" size="large" >About</Button></li>
              </Link>
              <Link to='/favorites' className='link'>
                <li><Button variant="contained" color="primary" size="large" >Favorite</Button></li>
              </Link>
            </ul>
          </div>
          <div className="search"></div>
        </div>
      </div>
      );
}

export default Header