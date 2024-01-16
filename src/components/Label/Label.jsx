import React from 'react';

const Label = ({props}) => {
  return (
    <span style={{width: props.width, height: props.height, visibility: props.visible}}>
      {props.caption}
    </span>
  );
}

export default Label;
