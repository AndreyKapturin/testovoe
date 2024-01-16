import React from 'react';

const Panel = ({props}) => {
  return (
    <div style={{width: props.width, height: props.height, border: '5px solid green', visibility: props.visible}}>
      я панель
    </div>
  );
}

export default Panel;