import React from 'react'
import AppContext from '../../context'

const Info = ({title, image, description}) => {
  const {setCartOpened} = React.useContext(AppContext);
  return (
    <div className='cartEmpty d-flex align-center justify-center flex-column flex'> 
              <img className='mb-20' width={120} height={120} src={image} alt="Empty Cart"/>
              <h2>{title}</h2>
              <p className='opacity-6'>{description}</p>
              <button onClick={() => setCartOpened(false)} className='greenBackButton'>
              <img className='' width={25} height={25} src='/img/arrow-left.svg' alt='Arrow' />
              Turn back
              </button>
    </div>
  )
}

export default Info
