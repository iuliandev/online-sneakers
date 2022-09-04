import React from "react";
import axios from "axios";
import { Routes, Route } from 'react-router-dom'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites  from "./pages/Favorites";
import Orders from "./pages/Orders";
import AppContext from "./context";

function App() {
  const [items, setItems] = React.useState([]);
  const[cartItems, setCartItems] = React.useState([]);
  const[favorites, setFavorites] = React.useState([]);
  const[searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);


  React.useEffect( () => {
  //   fetch('https://62dfe636976ae7460bf6dd77.mockapi.io/items').then((res) => {
  //   return res.json();
  // }).then((json) => {
  //   setItems(json);
  // });
    
    async function fetchData() {
      try {
        setIsLoading(true);
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
                                      axios.get('https://62dfe636976ae7460bf6dd77.mockapi.io/cart'), 
                                      axios.get('https://62dfe636976ae7460bf6dd77.mockapi.io/favorites'), 
                                      axios.get('https://62dfe636976ae7460bf6dd77.mockapi.io/items')
                                    ]);

        setIsLoading(false);
      
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Failed to get data response :(')
        console.error(error)
      }
      
    }
     
    fetchData();
    
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://62dfe636976ae7460bf6dd77.mockapi.io/cart/${findItem.id}`);
        
      } else {
         setCartItems((prev) => [...prev, obj]);
         const {data} = await axios.post('https://62dfe636976ae7460bf6dd77.mockapi.io/cart', obj);
         setCartItems((prev) => prev.map(item => {
          if(item.parentId === data.parentId) {
            return {
              ...item,
              id: data.id
            }
          }
          return item;
         }));
      }
    } catch (error) {
      alert('Failed to add to cart');
      console.error(error);
    }
      
    
  }

  const onRemoveItem = (id) => {
    try {
      setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)));
      axios.delete(`https://62dfe636976ae7460bf6dd77.mockapi.io/cart/${id}`); 
    } catch (error) {
      alert('Failed to remove items from cart')
      console.error(error)
    }
    
  }

  const onAddToFavorites = async (obj) => {
    try {
      if (favorites.find(favObj => Number(favObj.id) === Number(obj.id))) {
        axios.delete(`https://62dfe636976ae7460bf6dd77.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
      const {data} = await axios.post('https://62dfe636976ae7460bf6dd77.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, data]);
      }
  } catch (error) {
    alert('Failed to add to favorites');
    console.error(error);
  }
}

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (id) => {
     return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  }
  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, onAddToFavorites, onAddToCart, setCartOpened, setCartItems }}>
    <div className="wrapper clear">
      
     <Drawer items={cartItems} onClose = {() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
      
      <Header onClickCart = {() => setCartOpened(true)} />
        <Routes>
          <Route path="/" element={<Home 
                                              items={items} 
                                              cartItems={cartItems}
                                              searchValue={searchValue} 
                                              onChangeSearchInput={onChangeSearchInput} 
                                              onAddToCart={onAddToCart} 
                                              onAddToFavorites={onAddToFavorites} 
                                              isLoading={isLoading}
                                          />} />
        </Routes>
        
        <Routes >
          <Route path="/favorites" element={<Favorites
                                                
                                                onAddToFavorites = {onAddToFavorites}
                                             />} />
        </Routes>

        <Routes >
          <Route path="/orders" element={<Orders
                                                
                                                
                                             />} />
        </Routes>

      
    </div>
    </AppContext.Provider>
  );
}

export default App;
