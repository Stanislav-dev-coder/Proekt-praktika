import React, { useContext, useState } from 'react';
import Context from './Context';

const DropDownItem = (props) => {

  const {handleClick} = useContext(Context)

  return(
    <li onClick={handleClick}>
      <span className="country__title">{props.title}</span>
      <span className="country__price">{props.price}</span>
    </li>
  )
}

export default DropDownItem