import React from 'react'
import Card from '../components/Card'
import AppContext  from '../context';

function Favorites({ searchValue, onAddToCart, onAddToFavorites}) {
  const {favorites} = React.useContext(AppContext);
  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>My favorites</h1>
        </div>
        
        
        <div className="sneakers d-flex flex-wrap">
              { favorites.map((item, id) =>(
                <Card 
                  onPlus = {(obj) => onAddToCart(item)}
                  onFavorite = {onAddToFavorites}
                  isFavorite = {true}
                  {...item}
                />
              ))}
        </div>

      </div>
  )
}

export default Favorites