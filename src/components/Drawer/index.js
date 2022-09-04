import React from 'react'
import axios from 'axios'

import styles from './Drawer.module.scss'

import Info from '../Card/Info';
import { useCart } from '../../hooks/useCart';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


function Drawer({onClose, onRemove, items = [], opened}) {
  const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const {cartItems, setCartItems, totalPrice} = useCart();


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://62dfe636976ae7460bf6dd77.mockapi.io/orders', {items: cartItems});
      setOrderId(data.id);
      setIsOrderCompleted(true);
      setCartItems([]);
      
      //mockapi manual function for remove orders from cart after adding them in orders USELESS for other data...
      for(let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62dfe636976ae7460bf6dd77.mockapi.io/cart/' + item.id);
        await delay(1000);
      }
    
    } catch(error) {
      alert('Failed to complete order :(')
    }
    setIsLoading(false);
    
  }
  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
          <h2 className="mb-30 d-flex justify-between">
              Cart
              <button onClick={onClose} className={styles.buttonClose}>
                      <img className="removeBtn__img" width={12} height={12} src="/img/close.svg" alt="Close" />
              </button>
          </h2>
            {
              items.length > 0 ? (
              <div className='d-flex flex-column flex'>
                  <div className="items">
                  {items.map((obj) => (
                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                      <div style={{backgroundImage: `url(${obj.imageUrl})`}} className="cartItemImg"></div>
                      <div className='mr-20 flex'>
                        <p className='mb-5'>{obj.title}</p>
                        <b>{Math.round(obj.price)}MDL.</b>
                      </div>
                      <div className={styles.buttonRemove} onClick={() => onRemove(obj.id)}> 
                        <img
                          width={12} height={12}
                          className="removeBtn__img"
                          src='/img/close.svg'
                          alt="Remove"
                        />
                      </div>
                      
                    </div>
                  ))}

                </div>
                
                <div className={styles.cartTotalBlock}>
                  <ul>
                    <li>
                      <span>Total:</span>
                      <div></div>
                      <b>{totalPrice} MDL.</b>
                    </li>
                    <li>
                      <span>TVA 5%</span>
                      <div></div>
                      <b>{(totalPrice / 100) * 5} MDL.</b>
                    </li>
                  </ul>

                  <button className={styles.greenButton} disabled={isLoading} onClick={onClickOrder}>Checkout <img width={25} height={25} src="/img/arrow-right.svg" alt="Checkout" /></button>
                </div>
              </div> ) : ( 
                <Info 
                  title={isOrderCompleted ? "Order Completed!" : "Cart is empty"} 
                  description={isOrderCompleted ? `Your order #${orderId} soon will be delivered to your door.` : "Add one pair of sneakers, to finish order."}
                  image={isOrderCompleted ? "/img/purchase-done.svg" : "/img/open-box.png"} />
            

            )}
      </div>
    </div>
  );
}

export default Drawer;