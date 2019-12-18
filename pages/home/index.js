import React from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const HomePage = () => {
  const title = useSelector(state => state.home.title);
  console.log(Router);

  return (
    <div>
      <h1>Title:: {title}</h1>
    </div>
  );
};

export default HomePage;
