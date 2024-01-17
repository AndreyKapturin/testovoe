import React from 'react';

const Button = ({props}) => {
  return (
    <button style={{width: props.width, height: props.height, visibility: props.visible ? 'visible' : 'hidden'}}>
      {props.caption}
    </button>
  );
}

export default Button;
