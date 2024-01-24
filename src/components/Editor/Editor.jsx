import React, { useState } from 'react';
import s from './editor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Builder from '../Bulder/Builder';
import { changeElem } from '../../store/contentSlice';
import { get_type_of_value_by_path } from '../../utils/utils';


const Editor = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((s) => s.content);
  const [value_type, set_value_type] = useState('');
  const [path_is_valid, set_path_is_valid] = useState(false);
  console.log(value_type);
  function formSubmitter (e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));

    dispatch(changeElem({path: formData.path, newValue: formData.newValue}))
  }

  function validate_path(e) {
    if (!e.target.value) return;
    let path_keys = e.target.value.match(/\w*[^\.\[\]]/g);
    try {
      let type = get_type_of_value_by_path(path_keys, {content});
      set_value_type(type);
      set_path_is_valid(true);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={s.editor}>
      <div className={s.editor_header}>
        <form onSubmit={formSubmitter}>
          <label>
            Путь
            <input onBlur={validate_path} name='path' type='text' list='jopa' autoComplete='off'/>
          </label>
          <label>
            Новое назначение
            <input name='newValue' type='text' disabled={path_is_valid ? false : true} />
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
