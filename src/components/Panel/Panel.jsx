import React from 'react';
import Builder from '../Bulder/Builder';

const Panel = ({props, content}) => {
  console.log(content);
  return (
    <div style={{width: props.width, height: props.height, border: '5px solid green', visibility: props.visible ? 'visible' : 'hidden'}}>
      я панель
      {!!content && <Builder content={content} />}
    </div>
  );
}

export default Panel;
