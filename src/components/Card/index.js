import React from 'react'
import styles from './Card.module.scss';
import ContentLoader from "react-content-loader"
import AppContext from '../../context';


function Card( {id, title, imageUrl, price, onFavorite, onPlus, isFavorite = false, added = false, loading = false}) {
  const {isItemAdded} = React.useContext(AppContext);
  // const [isAdded, setIsAdded] = React.useState(added);
  const [isMarked, setIsMarked] = React.useState(isFavorite);
  const obj = {id, parentId:id, title, imageUrl, price}

  const onClickPlus = () => {
    onPlus(obj);
    // setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsMarked(!isMarked);
  };

  return (
            <div className={styles.card}>
            {
              loading ?  (<ContentLoader
                            speed={2}
                            width={180}
                            height={180}
                            viewBox="0 0 144 180"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            // {...props}
                          >
                            <rect x="0" y="0" rx="10" ry="10" width="144" height="85" /> 
                            <rect x="0" y="94" rx="5" ry="5" width="144" height="15" /> 
                            <rect x="0" y="142" rx="5" ry="5" width="60" height="15" /> 
                            <rect x="0" y="162" rx="5" ry="5" width="60" height="15" /> 
                            <rect x="110" y="144" rx="10" ry="10" width="32" height="32" /> 
                            <rect x="0" y="115" rx="5" ry="5" width="110" height="15" />
                          </ContentLoader>) : (<>
                                                  <div className='d-flex flex-column'>
                                                    <div className={styles.favorite}>
                                                      {onFavorite && <img onClick={onClickFavorite} width={20} height={20} src={isMarked ? "/img/favorite.png" : "/img/unfavorite.svg"} alt="Unliked" />}
                                                    </div>
                                                    
                                                    <img width={144} height={85} className="card__img" src={imageUrl} alt="" />
                                                  </div>
                                                  
                                                  
                                                  <h5>{title}</h5>
                                                  <div className="cardBottom d-flex justify-between align-center ">
                                                    <div className="d-flex flex-column ">
                                                      <span>Price:</span>
                                                      <b>{price} MDL.</b>
                                                    </div>
                                                      {onPlus && <img className={styles.plus} onClick={onClickPlus} width={12} height={12} src={isItemAdded(id) ? "/img/checked.png" : "/img/plus.svg"} alt="" />}
                                                  </div>
                                                </>
                                               )}
            </div>   
  );
}

export default Card