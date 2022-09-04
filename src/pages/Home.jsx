import React from 'react'
import Card from '../components/Card'
import AppContext from '../context'

function Home({items, searchValue, onChangeSearchInput, onAddToCart, onAddToFavorites, isFavorite, added, isLoading}) {
  
  const renderItems = () => {
    const filtredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(17)] 
                      : filtredItems).map((item, id) =>(
      <Card 
        onPlus = {(obj) => onAddToCart(obj)}
        onFavorite = {(obj) => onAddToFavorites(obj)}
        // added={isItemAdded(item && item.id)}
        loading={isLoading}
        {...item}
      />
    ))
  }
  return (
    <div className="content p-40">
        <div className="content-top d-flex align-center mb-40 justify-between">
         <h1 className="">{searchValue ? `Searching: "${searchValue}"` : 'All Sneakers'}</h1>
         <div className="search-block d-flex">
            <img className="search__img" width={20} height={20} src="/img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} placeholder="Search..." />
         </div>
        </div>
        
        
        <div className="sneakers d-flex flex-wrap">
              { renderItems() }
        </div>

      </div>
  )
}

export default Home