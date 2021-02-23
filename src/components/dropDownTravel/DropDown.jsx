import React, { useState } from 'react';
import DropDownItem from './DropDownItem'

const DropDown = (props) => {
  return(
    <ul> {props.children} </ul>
  )
}

export default DropDown