import React from 'react';

const Label = ({props}) => {
  return (
    <span style={{width: props.width, height: props.height, visibility: props.visible ? 'visible' : 'hidden'}}>
      {props.caption}
    </span>
  );
}

export default Label;
