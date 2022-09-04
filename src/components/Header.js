import React from 'react'
import {Link} from 'react-router-dom'
import {useCart} from '../hooks/useCart'

function Header(props) {
  const {totalPrice} = useCart();

  return (
    <header className="d-flex justify-between align-center p-40">
        <div className="headerLeft d-flex align-center">
          <Link to="/">
            <img className="logo__img" width={50} height={50} src='/img/logo.png' alt='' />
          </Link>
          <div className="headerInfo">
              <h3 className="text-uppercase">Online Sneakers</h3>
              <p className="opacity-5">Best Sneaker Store</p>
          </div>
          
        </div>
          
        <ul className="headerRight d-flex">
          <li onClick = {props.onClickCart} className=" cu-p">
            <img className="menuImgCart"  alt='' src="/img/cart.svg" />
            {/* <span className='cartTotal'>{totalPrice} MDL.</span> */}
          </li>
          <li onClick = {props.onClickCart} className=" cu-p">
            <span className='cartTotal'>{totalPrice} MDL.</span>
          </li>
          <li>
            <Link to="/favorites" ><img className="menuImgFavorites"  alt='Favorites' src="/img/favorites.svg" /></Link>
            
          </li>
          <li>
            <Link to="/orders" ><img className="menuImgProfile"  alt='Orders' src="/img/profile-user.svg" /></Link>
            
          </li>
          {/* <li className='mr-20 cu-p'>
            <img className="profile-user__img" width={25} height={25} alt='User' src="/img/profile-user.svg" />
          </li> */}
        </ul>
      </header>
  )
}

export default Header