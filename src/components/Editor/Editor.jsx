import React from 'react';
import s from './editor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Builder from '../Bulder/Builder';
import { changeElem } from '../../store/contentSlice';


const Editor = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((s) => s.content);

  function formSubmitter (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    dispatch(changeElem({path: formData.path, newValue: formData.newValue}))
  }

  return (
    <div className={s.editor}>
      <div className={s.editor_header}>
        <form onSubmit={formSubmitter}>
          <label>
            Путь
            <input name='path' type='text' list='jopa' autoComplete='off'/>
          </label>
          <label>
            Новое назначение
            <input name='newValue' type='text' />
          </label>
          <button>Применить</button>
        </form>
      </div>
      <div className={s.content}>
        <Builder content={content} />
      </div>
      <datalist id='jopa'>
        <option>{'content[0].type'}</option>
        <option>{'content[0].props.width'}</option>
        <option>{'content[0].props.height'}</option>
        <option>{'content[0].props.visible'}</option>
        <option>{'content[0].content[0]'}</option>
        <option>{'content[1].props.visible'}</option>
        <option>{'content[1].props.caption'}</option>
        <option>{'content[2].props.height'}</option>
        <option>{'content[2].props.width'}</option>
        <option>{'content[2].props.visible'}</option>
      </datalist>
    </div>
  );
};

export default Editor;
