import React from 'react';
import { useSelector } from 'react-redux';

const HomePage = () => {
  const title = useSelector(state => state.home.title);

  return (
    <div>
      <h1>Title:: {title}</h1>
    </div>
  );
};

export default HomePage;
