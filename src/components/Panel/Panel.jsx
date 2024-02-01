import React from 'react';
import Builder from '../Bulder/Builder';
import s from './panel.module.css';

const Panel = ({props, content}) => {
  return (
    <div className={s.panel} style={{width: props.width, height: props.height, visibility: props.visible ? 'visible' : 'hidden'}}>
      {!!content && <Builder content={content} />}
    </div>
  );
}

export default Panel;
