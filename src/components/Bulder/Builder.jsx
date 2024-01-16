import React from 'react';
import Panel from '../Panel/Panel';
import Label from '../Label/Label';
import Button from '../Button/Button';

const Builder = ({content}) => {
  function builderElem (el) {
    switch(el.type) {
      case 'panel':
        return <Panel key={el.type} props={el.props} />
      case 'label':
        return <Label key={el.type} props={el.props} />
      case 'button':
        return <Button key={el.type} props={el.props} />
      default:
        return new Error('ooops')
    }
  }

  return (
    <div>
      {content.map(el => builderElem(el))}
    </div>
  );
}

export default Builder;
