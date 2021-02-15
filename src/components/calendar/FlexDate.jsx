import React, { useState } from 'react';

const FlexDate = ({}) => {
  const [check, setCheck] = useState(false);

  
  return(
    <div>
      <input type="checkbox" onChange={() => {
        setCheck(!check)
        
        }}/>
      <span> ± 3 дня (гибкие даты)</span>
      {console.log(check)}
    </div>
  )
}

export default FlexDate
