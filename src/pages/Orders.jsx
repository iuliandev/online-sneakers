import axios from 'axios'
import React from 'react'
import Card from '../components/Card'
import AppContext from '../context';

function Orders() {
  const {onAddToFavorites, onAddToCart} = React.useContext(AppContext)
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    
    async function fetchData() {
      try  {
        const {data} = await axios.get('https://62dfe636976ae7460bf6dd77.mockapi.io/orders');

        setOrders(data.map(obj => obj.items).flat());
        // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []));

        setIsLoading(false);
      } catch(error) {
        alert('Failed to get orders :(');
        console.log(error);
      }
      
    }
    fetchData();
  }, []);
  return (
    <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>My Orders</h1>
        </div>
        
        
        <div className="sneakers d-flex flex-wrap">
              { (isLoading ? [...Array(8)] : orders).map((item, id) =>(
                <Card 
                  // onPlus = {(obj) => onAddToCart(item)}
                  // onFavorite = {(obj) => onAddToFavorites(obj)}
                  // added={isItemAdded(item && item.id)}
                  loading={isLoading}
        {...item}
                />
              ))}
        </div>

      </div>
  )
}

export default Orders;