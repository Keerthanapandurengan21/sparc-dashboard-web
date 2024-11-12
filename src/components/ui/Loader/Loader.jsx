import React from 'react';
import LoaderGif from '../../../assests/gifs/Loader.gif'
import './Loader.scss';

const Loader = () => {
  return (
    <div className="loader">
      <img id='activity-loader' src={LoaderGif} alt="Loading" />
    </div>
  );
};

export default Loader;
