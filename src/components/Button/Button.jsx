import React from 'react';

const Button = ({props}) => {
  return (
    <button style={{width: props.width, height: props.height, visibility: props.visible}}>
      {props.caption}
    </button>
  );
}

export default Button;
