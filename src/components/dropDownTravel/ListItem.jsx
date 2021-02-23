import React, { useState } from 'react';

const ListItem = (props) => {

  const [open, setOpen] = useState(false);

  return(
    <div>
      <a onClick={() => setOpen(!open)}>
        {props.title}
      </a>
      {open && props.children}
    </div>
  )
}

export default ListItem