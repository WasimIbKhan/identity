import React from 'react';

import './Card.css';

const Card = (props) => {
  const classes = 'card ' + props.className;

  return <div className={classes} style={{backgroundImage: `url(${props.imageBackground})`, width: '99vw', height: '20vh'}}>{props.children}</div>;
};

export default Card;
